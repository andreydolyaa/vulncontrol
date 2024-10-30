import dotenv from "dotenv";
import { HttpServer } from "./src/core/HttpServer.js";
import { Database } from "./src/core/Database.js";
import router from "./src/router.js";
import logger from "./src/core/logger.js";
import { Nmap } from "./src/modules/Nmap/Nmap.js";
import { removeAll } from "./src/modules/db-actions/db-actions.js";
import { NmapScan } from "./src/models/nmap-model.js";

dotenv.config();

const server = new HttpServer({
  port: Number(process.env.SERVER_PORT),
  router,
});

const database = new Database(process.env.DB_URL);

server
  .run()
  .then(async () => {
    await database.connect();
  })
  .then(async () => {
    const nmap = new Nmap({
      userId: "670f918c18444c7f0002e09e",
      scanType: "X",
      args: ["-sV", "192.168.178.241"],
    });
    // await nmap.start();
    // await removeAll(NmapScan);
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
