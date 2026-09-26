import User from "../model/user.js";
import Product from "../model/Product.js";
import Order from "../model/orders.js";

// =========================
// PRODUCTS
// =========================

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

// =========================
// USERS
// =========================

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
      .populate("items.product", "name price image category seller")
      .sort({ createdAt: -1 });

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

    // If order is being cancelled,
    // make its products available again.
    if (status === "cancelled" && order.status !== "cancelled") {
      const productIds = order.items.map((item) => item.product);

      await Product.updateMany(
        { _id: { $in: productIds } },
        {
          $set: {
            availabilityStatus: "available",
          },
        },
      );
    }

    order.status = status;
    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate("buyer", "username displayName email")
      .populate("items.product", "name price image category condition");

    res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};
