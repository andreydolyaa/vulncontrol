import express from "express";
import { verifyJWT } from "../middleware/verify-jwt.js";
import {
  getNmapData,
  getOverviewData,
  getRecentScans,
  getScansStatusData,
} from "../controllers/overview-controller.js";

const router = express.Router();

router.get("/overview", verifyJWT, getOverviewData);
router.get("/overview/nmap", verifyJWT, getNmapData);
router.get("/overview/recent-scans/:module", verifyJWT, getRecentScans);
router.get(
  "/overview/scans-status-data/:module",
  verifyJWT,
  getScansStatusData
);

export default router;
