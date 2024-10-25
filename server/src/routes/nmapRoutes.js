import express from "express";
import {
  abortScan,
  getAllScans,
  getScanById,
  startNmap,
} from "../controllers/nmap/nmapController.js";

const router = express.Router();

// TODO: Need to add auth middleware

router.post("/nmap", startNmap);
router.get("/nmap/scans", getAllScans);
router.get("/nmap/:id", getScanById);
router.post("/nmap/abort/:pid", abortScan);

export default router;
