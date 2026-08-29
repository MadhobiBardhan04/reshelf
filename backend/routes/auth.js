//ayesha auth.js//
import express from "express";

import {
  login,
  signup,
  firebaseLogin,
  logout,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/firebase", firebaseLogin);

router.post("/logout", logout);

export default router;
