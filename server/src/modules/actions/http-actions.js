import { server } from "../../../index.js";
import { Utils } from "../utils/Utils.js";
import { update } from "./db-actions.js";

export class HttpActions {
  constructor() {}

  static log(msg) {
    Utils.logWrapper("HTTP-ACTIONS", msg);
  }

  static async updateDb(model, data, id) {
    try {
      const doc = await update(model, data, id);
      HttpActions.log(`info: updating db...`);
      return doc;
    } catch (error) {
      HttpActions.log(`error: failed to update db`);
    }
  }

  static async writeServerMessage(model, data, id) {
    const update = {
      $push: {
        stdout:
          typeof data === "string"
            ? data
            : { $each: data.map((msg) => `server: ${msg}\n`) },
      },
    };
    try {
      await HttpActions.updateDb(model, update, id);
    } catch (error) {
      HttpActions.log(`error: failed to insert server message`);
    }
  }

  static notify(path, data) {
    server.websocketServer.updateSubsAtSubscription(path, data);
  }
}
