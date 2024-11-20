import express from "express";
import { verifyJWT } from "../middleware/verify-jwt.js";
import {
  deleteScan,
  getAllScans,
  startSubfinder,
} from "../controllers/subfinder-controller.js";

const router = express.Router();

router.get("/subfinder/scans", verifyJWT, getAllScans);
router.post("/subfinder", verifyJWT, startSubfinder);
router.delete("/subfinder/:id", verifyJWT, deleteScan);

export default router;
