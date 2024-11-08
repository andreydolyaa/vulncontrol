import express from "express";
import {
  getAllScans,
  startSubfinder,
} from "../controllers/subfinder-controller.js";

const router = express.Router();

router.get("/subfinder/scans", getAllScans);
router.post("/subfinder", startSubfinder);

export default router;
