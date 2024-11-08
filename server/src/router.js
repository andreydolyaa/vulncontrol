import express from "express";
import authRoutes from "./routes/auth.js";
import nmapRoutes from "./routes/nmap.js";
import subfinderRoutes from "./routes/subfinder.js";

const router = express.Router();

router.use("/api", 
  authRoutes, 
  nmapRoutes,
  subfinderRoutes
);

export default router;
