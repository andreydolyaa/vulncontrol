import express from "express";
import authRoutes from "./routes/auth.js";
import nmapRoutes from "./routes/nmap.js";
import subfinderRoutes from "./routes/subfinder.js";
import overviewRoutes from "./routes/overview.js";
import geolocationRoutes from "./routes/geolocation.js";

const router = express.Router();

router.use(
  "/api",
  authRoutes,
  nmapRoutes,
  subfinderRoutes,
  overviewRoutes,
  geolocationRoutes
);

export default router;
