import Order from "../model/orders.js";
import Product from "../model/Product.js";
import Cart from "../model/cart.js";

const DELIVERY_INSIDE = 80;
const DELIVERY_OUTSIDE = 120;

export const createOrder = async (req, res) => {
  try {
    const { items, deliveryLocation, address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No products selected." });
    }

    if (!["inside", "outside"].includes(deliveryLocation)) {
      return res.status(400).json({
        message: "Invalid delivery location.",
      });
    }

    if (!address?.city || !address?.road || !address?.house) {
      return res.status(400).json({
        message: "Complete delivery address is required.",
      });
    }

    // Fetch the actual products from the database
    const products = await Product.find({
      _id: { $in: items },
    });

    const ownProduct = products.find(
      (product) =>
        product.seller && product.seller.toString() === req.user.id.toString(),
    );

    if (ownProduct) {
      return res.status(400).json({
        message: `You cannot buy your own product: ${ownProduct.name}.`,
      });
    }
    if (products.length !== items.length) {
      return res.status(400).json({
        message: "One or more products could not be found.",
      });
    }

    // Make sure none of the products have already been sold
    const unavailableProduct = products.find(
      (product) => product.availabilityStatus === "sold",
    );

    if (unavailableProduct) {
      return res.status(400).json({
        message: `${unavailableProduct.name} is no longer available.`,
      });
    }

    const subtotal = products.reduce((sum, product) => sum + product.price, 0);

    const sellerIds = new Set(
      products.map((product) =>
        product.seller ? product.seller.toString() : "null",
      ),
    );

    const sellerCount = sellerIds.size;

    const deliveryPerSeller =
      deliveryLocation === "inside" ? DELIVERY_INSIDE : DELIVERY_OUTSIDE;

    const deliveryFee = sellerCount * deliveryPerSeller;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      buyer: req.user.id,

      items: products.map((product) => ({
        product: product._id,
        priceAtPurchase: product.price,

        // Seller information for this specific product
        seller: product.seller,

        // Seller's pickup address for this specific product
        sellerAddress: product.sellerAddress,
      })),

      deliveryLocation,

      address: {
        city: address.city,
        road: address.road,
        house: address.house,
        note: address.note || "",
      },

      deliveryFee,
      total,
      status: "pending",
    });

    // Make the products unavailable
    await Product.updateMany(
      {
        _id: {
          $in: products.map((product) => product._id),
        },
      },
      {
        $set: {
          availabilityStatus: "sold",
        },
      },
    );

    // Remove the ordered products from the buyer's cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          items: {
            product: {
              $in: products.map((product) => product._id),
            },
          },
        },
      },
    );

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to place order.",
    });
  }
};
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get my orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};
