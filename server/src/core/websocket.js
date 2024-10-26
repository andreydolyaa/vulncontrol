import { WebSocketServer } from "ws";
import logger from "./logger.js";

export class WsServer {
  constructor(httpServer) {
    this.websocketServer = new WebSocketServer({ server: httpServer });
    this.subscribers = {};
  }
  init() {
    logger.info("Websocket server started");
    this.websocketServer.on("connection", (websocket, request) => {
      const subscriber = this.getProcessId(request);

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
  async send(message, subscriber) {
    console.log(message, "MESSAGE");
    console.log(subscriber, "SUBSCRIBER");
    console.log(JSON.stringify(this.subscribers), "SUBSCRIBERS");
    
    
    if (this.subscribers[subscriber]) {
      try {
        this.subscribers[subscriber].send(JSON.stringify(message));
        logger.info(`ws | send message to subscriber: ${subscriber}`);
      } catch (error) {
        logger.error(
          `ws | failed to send message to subscriber: ${subscriber} error: ${error}`
        );
      }
    }
  }
  async updateBySubscriptionType(scan, subscribersCategory) {
    const data = JSON.stringify(scan);
    try {
      for (const subscriber in this.subscribers) {
        if (subscriber.includes(subscribersCategory)) {
          this.subscribers[subscriber].send(data);
          logger.info(
            `ws | update sended to subscriber [${subscriber}] [${data}]`
          );
        }
      }
    } catch (error) {
      logger.error(`ws | failed to update subscribers | error: ${error}`);
    }
  }
  sendToAll(message) {
    const data = JSON.stringify(message);
    try {
      for (const client of Object.values(this.subscribers)) {
        client.send(data);
      }
      logger.info(`ws | message broadcasting: ${data}`);
    } catch (error) {
      logger.error(`ws | error occurred during broadcasting: ${error}`);
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
        logger.info("Websocket server shut down...");
      }
    });
  }
  getSubscribers() {
    return this.subscribers;
  }
}
