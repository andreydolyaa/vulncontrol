import { WebSocketServer } from "ws";
import logger from "./logger.js";

export class WebsocketServer {
  constructor(httpServer) {
    this.server = new WebSocketServer({ server: httpServer });
    this.subscribers = {};

    this.init();
  }

  init() {
    this.server.on("connection", (websocket, req) => {
      const subscriber = this._generateSubscriberId(req);
      logger.info(`ws | new client connected [${subscriber}]`);
      this._handleNewConnection(websocket, subscriber);
    });
  }

  _handleNewConnection(websocket, subscriber) {
    this.subscribers[subscriber] = websocket;
    logger.info(`ws | new client subscription [${subscriber}]`);
  }

  _attachListeners(websocket, subscriber) {
    websocket.on("message", this._handleIncomingMessage);
    websocket.on("error", this._handleError);
    websocket.on("close", () => this._handleDisconnection(subscriber));
  }

  _handleIncomingMessage(message) {
    logger.info(`ws | new message received: ${message}`);
  }

  _handleError(error) {
    logger.error(`ws | error occurred: ${error}`);
  }

  _handleDisconnection(subscriber) {
    delete this.subscribers[subscriber];
    logger.info(`ws | client unsubscribed [${subscriber}]`);
  }

  _generateSubscriberId(req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.pathname.split("/").pop() || "default";
  }

  send(message, subscriber) {
    if (this.subscribers[subscriber]) {
      try {
        this.subscribers[subscriber].send(JSON.stringify(message));
        logger.info(`ws | message sent to: ${subscriber}`);
      } catch (error) {
        logger.error(`ws | send failed: ${subscriber} [${error}]`);
      }
    }
  }
}
