import express from "express";
import {
  abortScan,
  deleteScan,
  getAllScans,
  getScanById,
  startNmap,
} from "../controllers/nmap/nmap-controller.js";

const router = express.Router();

// TODO: Need to add auth middleware

router.post("/nmap", startNmap);
router.get("/nmap/scans", getAllScans);
router.get("/nmap/:id", getScanById);
router.post("/nmap/abort/:pid", abortScan);
router.delete("/nmap/:id", deleteScan);

export default router;
