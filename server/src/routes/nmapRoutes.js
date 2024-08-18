import express from "express";
import { startNmapScan } from "../controllers/nmapController.js";

const router = express.Router();

router.post("/auth/nmap", startNmapScan);

export default router;
