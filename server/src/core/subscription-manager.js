import logger from "./logger.js";

export class SubscriptionManager {
  constructor() {
    this.subscriptions = {};
  }

  create(id, ws) {
    if (!this.subscriptions[id]) {
      this.subscriptions[id] = [];
    }
    this.subscriptions[id].push(ws);
    logger.info(`SubscriptionManager | client subscribed to [id: ${id}]`);
    this._logInfo(id);
  }

  close(id, ws) {
    if (this.subscriptions[id]) {
      this.subscriptions[id] = this.subscriptions[id].filter(
        (session) => session !== ws
      );

      if (this.subscriptions[id].length === 0) {
        delete this.subscriptions[id];
        logger.info(`SubscriptionManager | subscription deleted [id: ${id}]`);
      }
    }
    logger.info(`SubscriptionManager | client unsubscribed from [id: ${id}]`);
    this._logInfo(id);
  }

  _logInfo(id) {
    const activeSubs = this.subscriptions[id]?.length || 0;
    logger.warn(
      `SubscriptionManager | ${[id]}: has ${activeSubs} active subscriptions`
    );
  }
}
