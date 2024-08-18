import express from "express";
import authRoutes from "./routes/authRoutes.js";
import nmapRoutes from "./routes/nmapRoutes.js";

const router = express.Router();

router.use("/api", 
  authRoutes, 
  nmapRoutes
);

export default router;
