import express from "express";
import {
  getNmapData,
  getOverviewData,
  getRecentScans,
} from "../controllers/overview-controller.js";

const router = express.Router();

router.get("/overview", getOverviewData);
router.get("/overview/nmap", getNmapData);
router.get("/overview/recent-scans/:module", getRecentScans);

export default router;
