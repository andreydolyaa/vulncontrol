import express from "express";
import { verifyJWT } from "../middleware/verify-jwt.js";
import {
  abortScan,
  deleteScan,
  getAllScans,
  getScanById,
  startNmap,
} from "../controllers/nmap-controller.js";

const router = express.Router();

router.post("/nmap", verifyJWT, startNmap);
router.get("/nmap/scans", verifyJWT, getAllScans);
router.get("/nmap/:id", verifyJWT, getScanById);
router.post("/nmap/abort/:id", verifyJWT, abortScan);
router.delete("/nmap/:id", verifyJWT, deleteScan);

export default router;
