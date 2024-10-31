import { WebSocketServer } from "ws";
import logger from "./logger.js";
import { SubscriptionManager } from "./SubscriptionManager.js";

export class WebsocketServer {
  constructor(httpServer) {
    this.server = new WebSocketServer({ server: httpServer });
    this.subscriptionManager = new SubscriptionManager();

    this._init();
  }

  _init() {
    this.server.on("connection", (websocket, req) => {
      const subscriber = this._extractUserId(req);
      const subscriptionPath = this._extractSubscribePath(req);
      this.subscriptionManager.create(subscriptionPath, websocket);
      this._handleNewConnection(websocket, subscriptionPath, subscriber);
    });
  }

  _handleNewConnection(websocket, subscriptionPath, subscriber) {
    logger.info(`WS | new client connected [${subscriber}]`);
    this._attachListeners(websocket, subscriptionPath, subscriber);
  }

  _attachListeners(websocket, subscriptionPath, subscriber) {
    websocket.on("message", this._handleIncomingMessage);
    websocket.on("error", this._handleError);
    websocket.on("close", () =>
      this._handleDisconnection(subscriptionPath, websocket)
    );
  }

  _handleIncomingMessage(message) {
    logger.info(`WS | new message received: ${message}`);
  }

  _handleError(error) {
    logger.error(`WS | error occurred: ${error}`);
  }

  _handleDisconnection(subscriptionPath, websocket) {
    this.subscriptionManager.close(subscriptionPath, websocket);
  }

  _extractUserId(req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.searchParams.get("userId");
  }

  _extractSubscribePath(req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return `/${url.pathname.split("/").slice(-2).join("/")}` || "default";
  }

  updateSubsAtSubscription(subscriptionPath, message) {
    const data = JSON.stringify(message);
    const subscription =
      this.subscriptionManager.subscriptions[subscriptionPath];

    if (!subscription) {
      logger.warn(`WS | subscription not exists [${subscriptionPath}]`);
      return;
    }

    subscription.forEach((subscriber) => {
      try {
        subscriber.send(data);
        logger.info(`WS | update sent to ${subscriptionPath} [data: ${data}]`);
      } catch (error) {
        logger.error(`WS | error updating subscriber [${error}]`);
      }
    });
  }
  // TODO: fix
  send(message, subscriber) {
    if (this.subscribers[subscriber]) {
      try {
        this.subscribers[subscriber].send(JSON.stringify(message));
        logger.info(`WS | message sent to: ${subscriber}`);
      } catch (error) {
        logger.error(`WS | send failed: ${subscriber} [${error}]`);
      }
    }
  }
}
