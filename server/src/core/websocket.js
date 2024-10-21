import { WebSocketServer } from "ws";
import logger from "./logger.js";

export class WsServer {
  constructor(httpServer) {
    this.websocketServer = new WebSocketServer({ server: httpServer });
    this.subscribers = {};
  }
  init() {
    logger.info("Websocket server listening...");
    this.websocketServer.on("connection", (websocket, request) => {
      const subscriber = this.getProcessId(request);
      console.log(subscriber); // 24

      this.handleNewConnection(websocket, subscriber);
      this.handleActions(websocket, subscriber);
    });
  }
  handleNewConnection(websocket, subscriber) {
    this.subscribers[subscriber] = websocket;
    logger.info(
      `ws | new client subscribed to process updates: ${subscriber} | [subscribers: ${JSON.stringify(
        Object.keys(this.subscribers)
      )}`
    );
  }
  handleActions(websocket, subscriber) {
    websocket.on("message", this.handleIncomingMessage);
    websocket.on("error", this.handleError);
    websocket.on("close", () => this.handleDisconnection(subscriber));
  }
  handleIncomingMessage() {
    // TODO: TBD
    logger.info(`new message received from subscriber: ${subscriber}`);
  }
  handleDisconnection(subscriber) {
    delete this.subscribers[subscriber];
    logger.info(
      `ws | client unsubscribed from process: ${subscriber} | [subscribers: ${JSON.stringify(
        this.subscribers
      )}]`
    );
  }
  handleError(error) {
    // TODO: TBD
    logger.error(`ws | error occurred during subscription: ${error}`);
  }
  send(message, subscriber) {
    if (this.subscribers[subscriber]) {
      try {
        this.subscribers[subscriber].send(JSON.stringify(message));
      } catch (error) {
        logger.error(
          `ws | failed to send message to subscriber: ${subscriber} error: ${error}`
        );
      }
    }
  }
  updateBySubscriptionType(scan, subscribersCategory) {
    try {
      for (const subscriber in this.subscribers) {
        if (subscriber.includes(subscribersCategory)) {
          this.subscribers[subscriber].send(JSON.stringify(scan));
          logger.info(
            `ws | update sended to subscriber [${subscriber}] [${JSON.stringify(
              scan
            )}]`
          );
        }
      }
    } catch (error) {
      logger.error(`ws | failed to update subscribers | error: ${error}`);
    }
  }
  sendToAll(message) {
    const data = JSON.stringify(message);
    for (const client of Object.values(this.subscribers)) {
      try {
        client.send(data);
      } catch (error) {
        // TODO: fix (need subscriber id and resend)
        logger.error(`ws | error occurred during broadcasting: ${error}`);
      }
    }
  }
  getProcessId(request) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;
    return pathname.split("/").pop();
  }
  shutdownServer() {
    Object.values(this.subscribers).forEach((client) => client.close());
    this.websocketServer.close((err) => {
      if (err) {
        logger.error(`error closing websocket server: ${err}`);
      } else {
        logger.info("webSocket server shut down gracefully");
      }
    });
  }
  getSubscribers() {
    return this.subscribers;
  }
}
