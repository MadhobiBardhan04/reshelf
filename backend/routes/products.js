import express from "express";

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

import checkToken from "../middlewares/checkToken.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/seller/my-products", checkToken, getMyProducts);
router.post("/", checkToken, upload.single("image"), createProduct);
router.patch("/:id/status", checkToken, updateProductStatus);
router.put("/:id", checkToken, upload.single("image"), updateProduct);
router.delete("/:id", checkToken, deleteProduct);
router.get("/:id", getProductById);

export default router;
