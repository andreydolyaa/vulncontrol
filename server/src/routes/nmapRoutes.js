import express from "express";
import {
  getAllScans,
  getLastScan,
  startNmapScan,
} from "../controllers/nmapController.js";

const router = express.Router();

// TODO: Need to add auth middleware

router.post("/nmap", startNmapScan);
router.get("/nmap/last", getLastScan);
router.get("/nmap/all", getAllScans);

export default router;
