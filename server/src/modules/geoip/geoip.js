import geoip from "geoip-lite";

export class GeoIp {
  constructor() {

  }

  static lookup() {
    return geoip.lookup("45.33.32.156");
  }
}