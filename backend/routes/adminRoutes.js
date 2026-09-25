import express from "express";
import checkToken from "../middlewares/checkToken.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import { getAllUsers } from "../controller/adminController.js";

const router = express.Router();

router.get("/users", checkToken, requireAdmin, getAllUsers);

export default router;
