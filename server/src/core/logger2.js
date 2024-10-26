import logger from "./logger.js";

export class Logger {
  static createLogger(source) {
    return {
      info: (message) => Logger.log("info", source, message),
      warn: (message) => Logger.log("warn", source, message),
      error: (message) => Logger.log("error", source, message),
    };
  }

  static log(type, source, message) {
    logger[type](`${source} | ${message}`);
  }

  static DB = Logger.createLogger("DATABASE")
  static WS = Logger.createLogger("WEBSOCKET")
  static DK = Logger.createLogger("DOCKER")
  static NM = Logger.createLogger("NMAP")
}
