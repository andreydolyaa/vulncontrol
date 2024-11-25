import dotenv from "dotenv";
import { HttpServer } from "./src/core/http-server.js";
import { Database } from "./src/core/database.js";
import router from "./src/router.js";
import logger from "./src/core/logger.js";
import { GeoIp } from "./src/modules/geoip/geoip.js";
import { removeAll } from "./src/modules/actions/db-actions.js";
import { NmapScan } from "./src/models/nmap-model.js";
import { SubfinderScan } from "./src/models/subfinder-model.js";

dotenv.config();

export const server = new HttpServer({
  port: Number(process.env.SERVER_PORT),
  router,
});

const database = new Database(process.env.DB_URL);

server
  .run()
  .then(async () => {
    await database.connect();
  })
  // TEST
  .then(async () => {
    // const ipsList = await GeoIp.resolveDomain();
    // const ip = ipsList[ipsList.length-1].address;
    // console.log(GeoIp.lookup(ip));
    
    
    // await removeAll(NmapScan);
    // await removeAll(SubfinderScan);
  });

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  console.error('Stack trace:', reason.stack);
});

process.on("SIGINT", async () => {
  await database.disconnect();
  process.exit(0);
});
