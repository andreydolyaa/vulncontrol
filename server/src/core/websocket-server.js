import { WebSocket, WebSocketServer } from "ws";
import { SubscriptionManager } from "./subscription-manager.js";
import { WS_CONNECTION } from "../constants/common.js";
import logger from "./logger.js";

export class WebsocketServer {
  constructor(httpServer) {
    this.interval = null;
    this.server = new WebSocketServer({ server: httpServer });
    this.subscriptionManager = new SubscriptionManager();

    this._init();
  }

  _init() {
    this.server.on("connection", (websocket, req) => {
      const subscriber = this._extractUserId(req);
      const subscriptionPath = this._extractSubscribePath(req);
      this.subscriptionManager.create(subscriptionPath, websocket, subscriber);
      this._handleNewConnection(websocket, subscriptionPath, subscriber);
    });
  }

  _handleNewConnection(websocket, subscriptionPath, subscriber) {
    this._startPing(websocket);
    logger.info(`WS | new client connected [${subscriber}]`);
    this._attachListeners(websocket, subscriptionPath, subscriber);
  }

  _attachListeners(websocket, subscriptionPath, subscriber) {
    websocket.on("message", this._handleIncomingMessage);
    websocket.on("error", this._handleError);
    websocket.on("close", () =>
      this._handleDisconnection(subscriptionPath, websocket, subscriber)
    );
  }

  _handleIncomingMessage(message) {
    logger.info(`WS | new message received: ${message}`);
  }

  _handleError(error) {
    logger.error(`WS | error occurred: ${error}`);
  }

  _handleDisconnection(subscriptionPath, websocket, subscriber) {
    this.subscriptionManager.close(subscriptionPath, websocket, subscriber);
    clearInterval(this.interval);
  }

  _extractUserId(req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.searchParams.get("userId");
  }

  _extractSubscribePath(req) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return `/${url.pathname.split("/").slice(-2).join("/")}` || "default";
  }

  _startPing(ws) {
    this.interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: WS_CONNECTION.PING }));
      }
    }, WS_CONNECTION.PING_INTERVAL);
  }

  updateSubsAtSubscription(subscriptionPath, message, userId) {
    const data = JSON.stringify(message);
    const subscriptions =
      this.subscriptionManager.subscriptions[subscriptionPath];

    if (!subscriptions) {
      return;
    }

    const subscription = subscriptions[userId];
    if (!subscription) {
      return;
    }

    subscription.forEach((session) => {
      try {
        session.send(data);
        logger.info(
          `WS | update sent to ${subscriptionPath} [user: ${userId}]`
        );
      } catch (error) {
        logger.error(
          `WS | error updating subscriber ${userId} at ${subscriptionPath} [${error}]`
        );
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
