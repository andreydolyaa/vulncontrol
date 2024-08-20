import express from "express";
import { getLastScan, startNmapScan } from "../controllers/nmapController.js";

const router = express.Router();

// TODO: Need to add auth middleware

router.post("/nmap", startNmapScan);
router.get("/nmap/last", getLastScan)

export default router;
