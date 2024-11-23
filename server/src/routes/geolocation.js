import express from "express";
import { verifyJWT } from "../middleware/verify-jwt.js";
import { getGeolocationPoints } from "../controllers/geolocation-controller.js";

const router = express.Router();

router.get("/geolocation", verifyJWT, getGeolocationPoints);

export default router;
