import dotenv from "dotenv";
import { HttpServer } from "./src/core/http-server.js";
import { Database } from "./src/core/database.js";
import router from "./src/router.js";
import logger from "./src/core/logger.js";
import { NmapScan } from "./src/models/nmap-model.js";
import { removeAll } from "./src/modules/db-actions/db-actions.js";
import { TheHarvester } from "./src/modules/the-harvester/the-harvester.js";
import { TheHarvesterScan } from "./src/models/the-harvester-model.js";

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
    const theHarvester = new TheHarvester({
      userId: "670f918c18444c7f0002e09e",
      scanType: "TEST",
      domain: "http://www.egged.co.il/",
    });
    await theHarvester.start();
    // await removeAll(NmapScan);
    // await removeAll(TheHarvesterScan);
  });

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await database.disconnect();
  process.exit(0);
});
