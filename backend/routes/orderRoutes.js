import express from "express";

import { createOrder, getMyOrders } from "../controller/orderController.js";

import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/", checkToken, createOrder);

router.get("/my", checkToken, getMyOrders);

export default router;
