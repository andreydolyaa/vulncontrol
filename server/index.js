import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/router.js";
import logger from "./src/core/logger.js";
import { setupErrorHandler } from "./src/core/errorHandler.js";
import { serverMsg } from "./src/constants/messages.js";
import { connectToDatabase } from "./src/core/database.js";
import { httpLoggerMiddleware } from "./src/middleware/httpLogger.js";
import { WsServer } from "./src/core/websocket.js";
import { removeAllContainers } from "./src/controllers/nmap/nmapDockerProcess.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
const httpServer = http.createServer(app);
export const websocketServer = new WsServer(httpServer);

app.use(express.json());
app.use(cors());
app.use(httpLoggerMiddleware);
app.use(router);

const startServers = async () => {
  httpServer.listen(port, (error) => {
    if (error) {
      logger.error(serverMsg.START_ERROR);
      shutdown(1);
    } else {
      logger.info(serverMsg.START_SUCCESS(port));
    }
  });
};

const shutdown = (code) => {
  logger.error(serverMsg.SHUT_DOWN_IN_PROGRESS);
  removeAllContainers();
  websocketServer.shutdownServer(() => {
    httpServer.close(() => {
      logger.error(serverMsg.SHUT_DOWN_COMPLETE);
      process.exit(code);
    });
  });
};

process.on("exit", (code) => {
  logger.info(`Process exited with code: ${code}`);
  shutdown(0);
});

setupErrorHandler(httpServer, logger, shutdown)
  .then(startServers)
  .then(connectToDatabase)
  .then(websocketServer.init());
