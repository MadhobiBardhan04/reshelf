import checkToken from "../middlewares/checkToken.js";
import express from "express";
const router = express.Router();
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controller/cartController.js";

router.get("/", checkToken, getCart);
router.post("/", checkToken, addToCart);
router.delete("/:productId", checkToken, removeFromCart);
export default router;
