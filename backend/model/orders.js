import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      priceAtPurchase: {
        type: Number,
        required: true,
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      sellerAddress: {
        city: String,
        road: String,
        house: String,
        note: String,
      },
    },
  ],

  deliveryLocation: {
    type: String,
    enum: ["inside", "outside"],
    required: true,
  },

  address: {
    city: {
      type: String,
      required: true,
    },
    road: {
      type: String,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },

  deliveryFee: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
