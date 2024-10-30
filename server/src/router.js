import express from "express";
import authRoutes from "./routes/auth.js";
import nmapRoutes from "./routes/nmap.js";

const router = express.Router();

router.use("/api", 
  authRoutes, 
  nmapRoutes
);

export default router;
