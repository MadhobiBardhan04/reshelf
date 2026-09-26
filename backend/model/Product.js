import mongoose from "mongoose";
import {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  updateProductStatus,
} from "../controller/productController.js";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subcategory: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
