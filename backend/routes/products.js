import express from "express";
import {
    getProducts,
    getProductsByCategory,
    getProductById,
    createProduct
} from "../controller/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/:id", getProductById);

router.post("/", createProduct);

export default router;