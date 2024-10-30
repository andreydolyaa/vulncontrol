import express from "express";
import {
  getLoggedUser,
  login,
  logout,
  register,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/register", register);
router.get("/auth/user", getLoggedUser);

export default router;
