import express from "express";
import {
  getNmapData,
  getOverviewData,
  getRecentScans,
  getScansStatusData,
} from "../controllers/overview-controller.js";

const router = express.Router();

router.get("/overview", getOverviewData);
router.get("/overview/nmap", getNmapData);
router.get("/overview/recent-scans/:module", getRecentScans);
router.get("/overview/scans-status-data/:module", getScansStatusData);

export default router;
