import mongoose from "mongoose";
import logger from "./logger.js";
import { Utils } from '../modules/utils/utils.js';

export class Database {
  RECONNECT_INTERVAL = 1000;
  CONNECTION_TIMEOUT = 3000;

  constructor(uri) {
    this.uri = uri;

    this.setupListeners();
  }

  async connect() {
    logger.warn("DB | trying to connect...");
    try {
      await mongoose.connect(this.uri, {
        serverSelectionTimeoutMS: this.CONNECTION_TIMEOUT,
      });
    } catch (error) {}
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
    } catch (error) {
      logger.error(`DB | error disconnecting [error ${error}]`);
    }
  }

  async reconnect() {
    await Utils.sleep(this.RECONNECT_INTERVAL);
    await this.connect();
  }

  setupListeners() {
    mongoose.connection.on("connected", () => {
      logger.info("DB | connection established");
    });
    mongoose.connection.on("disconnected", () => {
      logger.warn("DB | disconnected");
      this.reconnect();
    });
    mongoose.connection.on("close", () => {
      logger.info("DB | connection closed");
    });
    mongoose.connection.on("error", (error) => {
      logger.error(`DB | connection error [error: ${error}]`);
    });
  }
}
