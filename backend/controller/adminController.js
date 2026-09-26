import User from "../model/user.js";
import Product from "../model/Product.js";
import Order from "../model/orders.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "username displayName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Get all products error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const updateProductApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const allowedStatuses = ["pending", "approved", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid approval status" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.approvalStatus = status;
    product.rejectionReason = status === "rejected" ? rejectionReason || "" : "";

    await product.save();

    const updatedProduct = await Product.findById(product._id).populate(
      "seller",
      "username displayName email",
    );

    res.status(200).json({
      message: "Product approval status updated",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product approval error:", error);
    res.status(500).json({ message: "Failed to update product approval status" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// =========================
// ORDERS
// =========================

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "username displayName email")
      .populate(
        "items.product",
        "name price image category condition seller sellerAddress",
      )
      .populate("items.seller", "username displayName email")
      .sort({ createdAt: -1 });

    // Fill seller information for old orders
    for (const order of orders) {
      for (const item of order.items) {
        if (!item.seller && item.product?.seller) {
          item.seller = item.product.seller;
        }

        if (!item.sellerAddress && item.product?.sellerAddress) {
          item.sellerAddress = item.product.sellerAddress;
        }

        // Populate the seller manually if necessary
        if (item.product?.seller && !item.seller?.displayName) {
          const seller = await User.findById(item.product.seller).select(
            "username displayName email",
          );

          if (seller) {
            item.seller = seller;
          }
        }
      }
    }

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "delivered", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    for (const item of order.items) {
      if (!item.seller && item.product) {
        const product = await Product.findById(item.product);

        if (product?.seller) {
          item.seller = product.seller;

          if (product.sellerAddress) {
            item.sellerAddress = product.sellerAddress;
          }
        }
      }
    }

    order.status = status;

    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate("buyer", "username displayName email")
      .populate("items.product", "name price image category condition")
      .populate("items.seller", "username displayName email");

    res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    res.status(500).json({
      message: error.message || "Failed to update order status",
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Orders grouped by month
    const monthlyOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $exists: true },
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },

          orders: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Convert month number to month name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const orderStatistics = monthlyOrders.map((item) => ({
      month: monthNames[item._id.month - 1],
      year: item._id.year,
      orders: item.orders,
    }));

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      orderStatistics,
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
};