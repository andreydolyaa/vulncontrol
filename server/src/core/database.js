import mongoose from "mongoose";
import logger from "./logger.js";
import { sleep } from "../utils/index.js";

export class Database {
  RECONNECT_INTERVAL = 1000;
  CONNECTION_TIMEOUT = 3000;

  constructor(uri) {
    this.uri = uri;

    this.setupListeners();
  }

  async connect() {
    logger.warn("db | trying to connect...");
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
      logger.error(`db | error disconnecting [error ${error}]`);
    }
  }

  async reconnect() {
    await sleep(this.RECONNECT_INTERVAL);
    await this.connect();
  }

  setupListeners() {
    mongoose.connection.on("connected", () => {
      logger.info("db | connection established");
    });
    mongoose.connection.on("disconnected", () => {
      logger.warn("db | disconnected");
      this.reconnect();
    });
    mongoose.connection.on("close", () => {
      logger.info("db | connection closed");
    });
    mongoose.connection.on("error", (error) => {
      logger.error(`db | connection error [error: ${error}]`);
    });
  }
}
