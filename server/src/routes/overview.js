import express from "express";
import {
  getNmapData,
  getOverviewData,
} from "../controllers/overview-controller.js";

const router = express.Router();

router.get("/overview", getOverviewData);
router.get("/overview/nmap", getNmapData);

export default router;
