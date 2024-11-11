import express from "express";
import {
  deleteScan,
  getAllScans,
  startSubfinder,
} from "../controllers/subfinder-controller.js";

const router = express.Router();

router.get("/subfinder/scans", getAllScans);
router.post("/subfinder", startSubfinder);
router.delete("/subfinder/:id", deleteScan);

export default router;
