import logger from "../core/logger.js";

export const sleep = async (ms) => {
  return await new Promise((resolve) => setInterval(resolve, ms));
};

export const loggerWrapper = (prefix, message) => {
  if (message.startsWith("err:")) {
    logger.error(prefix + message.substring(5));
  } else if (message.startsWith("warn:")) {
    logger.warn(prefix + message.substring(6));
  } else if (message.startsWith("info:")) {
    logger.info(prefix + message.substring(6));
  } else {
    logger.info(prefix + message);
  }
};

export const extractDomain = (url) => {
  const domain = url.replace(/.*?:\/\//, "").replace(/\/.*$/, "");
  return domain.replace(/^www\./, "");
};

export const extractIP = (str) => {
  // Regular expressions for matching IPv4, IPv6, and domain names
  const ipv4Regex = /(\d{1,3}\.){3}\d{1,3}/;
  const ipv6Regex =
    /([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|::([0-9a-fA-F]{1,4}:){1,6}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]{0,2}){0,1}[0-9]{0,2})\.){3}(25[0-5]|(2[0-4]|1{0-1}[0-9]{0,2}){0,1}[0-9]{0,2})|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0-1}[0-9]{0,2}){0,1}[0-9]{0,2})\.){3}(25[0-5]|(2[0-4]|1{0-1}[0-9]{0,2}){0,1}[0-9]{0,2})/;
  const domainRegex = /([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;

  // Try to match IPv4 first
  let match = str.match(ipv4Regex);
  if (match) {
    const ip = match[0];
    // Validate each octet for IPv4
    const isValid = ip.split(".").every((num) => {
      const n = Number(num);
      return n >= 0 && n <= 255;
    });

    if (isValid) return ip; // Return valid IPv4
  }

  // If no valid IPv4, try to match IPv6
  match = str.match(ipv6Regex);
  if (match) {
    return match[0]; // Return the first valid IPv6
  }

  // If no valid IP addresses, try to match a domain name
  match = str.match(domainRegex);
  if (match) {
    return match[0]; // Return the first valid domain name
  }

  // Return null if no valid IP address or domain is found
  return null;
};
