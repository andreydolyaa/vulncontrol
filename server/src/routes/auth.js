import express from "express";
import { verifyAdminAccess } from "../middleware/admin-access.js";
import {
  getLoggedUser,
  login,
  logout,
  register,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/register", verifyAdminAccess, register);
router.get("/auth/user", getLoggedUser);

export default router;
