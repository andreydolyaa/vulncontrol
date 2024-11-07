import dotenv from "dotenv";
import { HttpServer } from "./src/core/http-server.js";
import { Database } from "./src/core/database.js";
import router from "./src/router.js";
import logger from "./src/core/logger.js";
import { NmapScan } from "./src/models/nmap-model.js";
import { removeAll } from "./src/modules/db-actions/db-actions.js";
import { Subfinder } from "./src/modules/subfinder/subfinder.js";
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
    const subfinder = new Subfinder({
      userId: "670f918c18444c7f0002e09e",
      scanType: "TEST",
      domain: "http://www.hackthissite.org/",
    });
    // await subfinder.start();
    // await removeAll(NmapScan);
    // await removeAll(SubfinderScan);
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
