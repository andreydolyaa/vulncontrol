import { server } from "../../../index.js";
import { update } from "./db-actions.js";
import { Utils } from "../utils/utils.js";
import { moduleWrapper } from "../../constants/wrappers.js";

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
            ? `server: ${data}\n`
            : { $each: data.map((msg) => `server: ${msg}\n`) },
      },
    };
    try {
      await HttpActions.updateDb(model, update, id);
    } catch (error) {
      HttpActions.log(`error: failed to insert server message`);
    }
  }

  static notify(path, data, module, userId) {
    server.websocketServer.updateSubsAtSubscription(
      path,
      moduleWrapper(module, data),
      userId
    );
  }
}
