import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { serverMsg } from "./src/constants/messages.js";
import router from "./src/router.js";
import { setupErrorHandler } from "./src/core/errorHandler.js";
import logger from "./src/core/logger.js";
import { connectToDatabase } from "./src/core/database.js";
import { httpLoggerMiddleware } from "./src/middleware/httpLogger.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
const httpServer = http.createServer(app);
const websocketServer = new WebSocketServer({ server: httpServer });

app.use(express.json());
app.use(cors());
app.use(httpLoggerMiddleware)
app.use(router);

const startServer = async () => {
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
  websocketServer.close(() => {
    httpServer.close(() => {
      logger.error(serverMsg.SHUT_DOWN_COMPLETE);
      process.exit(code);
    });
  });
};

setupErrorHandler(httpServer, websocketServer, logger, shutdown)
  .then(startServer)
  .then(connectToDatabase);