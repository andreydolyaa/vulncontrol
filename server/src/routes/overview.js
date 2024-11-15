import express from "express";
import { getOverviewData } from "../controllers/overview-controller.js";

const router = express.Router();

router.get("/overview", getOverviewData);

export default router;
