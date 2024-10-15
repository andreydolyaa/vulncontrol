import express from "express";
import {
  getAllScans,
  getLastScan,
  getScanById,
  startNmapScan,
} from "../controllers/nmapController.js";

const router = express.Router();

// TODO: Need to add auth middleware

router.post("/nmap", startNmapScan);
router.get("/nmap/last", getLastScan);
router.get("/nmap/all", getAllScans);
router.get("/nmap/:id", getScanById)

export default router;
