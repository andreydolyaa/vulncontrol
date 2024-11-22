import { Utils } from "../modules/utils/utils.js";

export class SubscriptionManager {
  constructor() {
    this.subscriptions = {};
  }

  // subscription path -> user id -> array of sessions
  // {
  //    /nmap/updates: { 
  //          112e042681b5f49969a64009: [ [WebSocket], [WebSocket] ] 
  //    },

  //    /subfinder/updates: { 
  //          555e042681b5f49969a64333: [ [WebSocket] ],
  //          g43e042681b5f49969a64gww: [ [WebSocket], [WebSocket], [WebSocket] ]
  //    }
  // }

  create(path, ws, subscriber) {
    if (!this.subscriptions[path]) {
      this.subscriptions[path] = {};
    }
    if (!this.subscriptions[path][subscriber]) {
      this.subscriptions[path][subscriber] = [];
    }
    this.subscriptions[path][subscriber].push(ws);

    SubscriptionManager.log(`info: ${subscriber} subscribed to [${path}]`);
    console.log(this.subscriptions);
  }

  close(path, ws, subscriber) {
    if (this.subscriptions[path] && this.subscriptions[path][subscriber]) {
      this.subscriptions[path][subscriber] = this.subscriptions[path][
        subscriber
      ].filter((session) => session !== ws);

      if (this.subscriptions[path][subscriber].length === 0) {
        delete this.subscriptions[path][subscriber];
        SubscriptionManager.log(`info: subscriber deleted [${subscriber}]`);
      }

      if (Object.keys(this.subscriptions[path]).length === 0) {
        delete this.subscriptions[path];
        SubscriptionManager.log(`info: subscription deleted [path: ${path}]`);
      }
    }
    console.log(this.subscriptions);
  }

  static log(msg) {
    Utils.logWrapper("WS_SUB_MANAGER", msg);
  }
}
