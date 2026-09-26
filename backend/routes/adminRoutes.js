import express from "express";

import checkToken from "../middlewares/checkToken.js";
import requireAdmin from "../middlewares/requireAdmin.js";

import {
  getAllUsers,
  getAllProducts,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} from "../controller/adminController.js";

const router = express.Router();

router.get(
  "/stats",
  checkToken,
  requireAdmin,
  getDashboardStats
);

router.get(
  "/users",
  checkToken,
  requireAdmin,
  getAllUsers
);

router.get(
  "/products",
  checkToken,
  requireAdmin,
  getAllProducts
);

router.get(
  "/orders",
  checkToken,
  requireAdmin,
  getAllOrders
);

router.patch(
  "/orders/:id/status",
  checkToken,
  requireAdmin,
  updateOrderStatus
);

export default router;