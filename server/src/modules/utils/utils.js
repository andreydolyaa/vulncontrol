import path from "path";
import { fileURLToPath } from "url";
import { PROC_SIGNAL, PROC_STATUS } from "../../constants/processes.js";
import logger from "../../core/logger.js";

export class Utils {
  static __filename = fileURLToPath(import.meta.url);
  static __dirname = path.dirname(Utils.__filename);
  static ipv4Regex = /(\d{1,3}\.){3}\d{1,3}/;
  static ipv6Regex =
    /(?:^|(?<=\s))(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))(?=\s|$)/;
  constructor() {}

  static setCurrentTime() {
    return new Date().toISOString();
  }

  static getFileName(id) {
    // all scan file paths and names constructed of report_<scan id>.txt
    return "report-" + id + ".txt";
  }
  static getFilePath(dirname, id) {
    return dirname + "/reports" + "/" + Utils.getFileName(id);
  }

  static handleStreamExitStatus(code, signal) {
    return code === 0
      ? PROC_STATUS.DONE
      : code >= 1
      ? PROC_STATUS.FAILED
      : code === null && signal === PROC_SIGNAL.SIGKILL
      ? PROC_STATUS.ABORTED
      : null;
  }

  static async sleep(ms) {
    return await new Promise((resolve) => setInterval(resolve, ms));
  }

  static extractDomainAddress(url) {
    const domain = url.replace(/.*?:\/\//, "").replace(/\/.*$/, "");
    return domain.replace(/^www\./, "");
  }

  static logWrapper(prefix, message) {
    prefix = prefix.toUpperCase() + " | ";
    if (message.startsWith("err:")) {
      logger.error(prefix + message.substring(5));
    } else if (message.startsWith("warn:")) {
      logger.warn(prefix + message.substring(6));
    } else if (message.startsWith("info:")) {
      logger.info(prefix + message.substring(6));
    } else {
      logger.info(prefix + message);
    }
  }

  static isIPAddress(str) {
    return this.ipv4Regex.test(str) || this.ipv6Regex.test(str);
  }

  static isDomain(str) {
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(str);
  }

  static extractIPAddress(str) {
    const domainRegex = /([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
    let match = str.match(this.ipv4Regex);
    if (match) {
      const ip = match[0];
      const isValid = ip.split(".").every((num) => {
        const n = Number(num);
        return n >= 0 && n <= 255;
      });
      if (isValid) return ip;
    }
    match = str.match(this.ipv6Regex);
    if (match) {
      return match[0];
    }
    match = str.match(domainRegex);
    if (match) {
      return match[0];
    }
    return null;
  }
}
