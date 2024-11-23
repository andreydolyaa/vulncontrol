import dns from "dns/promises";
import geoip from "geoip-lite";
import { Utils } from "../utils/utils.js";
import { GEO_IP } from "../../constants/processes.js";
import { GeolocationIP } from "../../models/geolocation-model.js";

export class GeoIp {
  constructor() {}

  static async resolveDomain(domain) {
    if (Utils.isIPAddress(domain)) {
      return [{ address: Utils.extractIPAddress(domain), family: 4 }];
    } else if (Utils.isDomain(domain)) {
      const clean = Utils.extractDomainAddress(domain);
      return await dns.lookup(clean, { all: true });
    }
    return;
  }

  static async upsertData(data, ip, scanId, target, scanModel) {
    try {
      const doc = await GeolocationIP.findOneAndUpdate(
        { ip },
        {
          $set: { data, scanId, ip, target, scanModel },
          $inc: { scanCount: 1 },
        },
        {
          new: true,
          upsert: true,
        }
      );
      GeoIp.log(`info: db updated [${scanId}]`);
      return doc;
    } catch (error) {
      GeoIp.log(
        `err: failed to update db [${scanId}] with [${data}] [error:${error}]`
      );
    }
  }

  static lookup(ip) {
    return geoip.lookup(ip);
  }

  static getIPv4Address(addresses) {
    return addresses.find((entry) => entry.family === 4)?.address || null;
  }

  static log(msg) {
    Utils.logWrapper(GEO_IP, msg);
  }
}
