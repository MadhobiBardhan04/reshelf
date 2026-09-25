import express from "express";
import {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
} from "../controller/productController.js";
import checkToken from "../middlewares/checkToken.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/:id", getProductById);

router.post(
  "/",
  checkToken,
  upload.single("image"),
  createProduct
);


export default router;
