import express from "express";
import { startSubfinder } from "../controllers/subfinder-controller.js";

const router = express.Router();

router.post("/subfinder", startSubfinder);

export default router;
