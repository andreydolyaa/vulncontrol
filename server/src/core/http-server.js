import http from "http";
import express from "express";
import cors from "cors";
import logger from "./logger.js";
import { httpLoggerMiddleware } from "../middleware/http-logger.js";
import { WebsocketServer } from "./websocket-server.js";

export class HttpServer {
  constructor(options) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.port = options.port;
    this.router = options.router;
    this.websocketServer = null;

    this._init();
  }

  _init() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(httpLoggerMiddleware);
    this.app.use(this.router);
  }

  async run() {
    this.httpServer.listen(this.port, () => {
      logger.info(`http server started [${this.port}]`);
      try {
        this.websocketServer = new WebsocketServer(this.httpServer);
        logger.info(`websocket server initialized`);
      } catch (error) {
        logger.error(`failed to initialize websocket server: [${error}]`);
        this.shutdown();
      }
    });
    this.httpServer.on("error", (error) => {
      logger.error(`http server error: [${error}]`);
      this.shutdown();
    });
  }

  shutdown() {
    logger.info("shutting down server...");
    if (this.websocketServer) {
      this.websocketServer.server.close(() =>
        logger.info("websocket server closed")
      );
    }
    this.httpServer.close(() => {
      logger.info("http server closed");
      process.exit(1);
    });
  }
}