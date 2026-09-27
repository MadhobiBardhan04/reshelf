import Cart from "../model/cart.js";
import Product from "../model/Product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
    );

    if (!cart) return res.status(200).json({ items: [] });

    // filter out items whose product no longer exists or isn't available
    const validItems = cart.items.filter(
      (item) => item.product && item.product.availabilityStatus !== "sold",
    );

    res.status(200).json({ ...cart.toObject(), items: validItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the actual product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Prevent a seller from buying their own product
    if (
      product.seller &&
      product.seller.toString() === req.user.id.toString()
    ) {
      return res.status(403).json({
        message: "You cannot add your own product to your cart.",
      });
    }

    let cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $setOnInsert: { user: req.user.id } },
      { upsert: true, new: true },
    );

    const alreadyInCart = cart.items.some(
      (item) => item.product.toString() === productId.toString(),
    );

    if (!alreadyInCart) {
      cart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: {
            items: {
              product: productId,
            },
          },
        },
        { new: true },
      );
    }

    cart = await cart.populate("items.product");

    res.status(200).json(cart);
  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      message: "Failed to add to cart",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    await Cart.updateOne(
      { user: req.user.id },
      {
        $pull: {
          items: {
            product: productId,
          },
        },
      },
    );

    res.status(200).json({
      message: "Removed from cart",
    });
  } catch (error) {
    console.error("Remove from cart error:", error);

    res.status(500).json({
      message: "Failed to remove from cart",
    });
  }
};
