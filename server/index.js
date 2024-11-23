import dotenv from "dotenv";
import { HttpServer } from "./src/core/http-server.js";
import { Database } from "./src/core/database.js";
import router from "./src/router.js";
import logger from "./src/core/logger.js";

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
