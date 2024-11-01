import moment from "moment";

export const createBearerToken = (storageName) => {
  const raw = localStorage.getItem(storageName);
  const token = raw.replace(/"/g, "");
  return `Bearer ${token}`;
};

export const downloadBlob = (content, fileName) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
};

export const randomNum = () => {
  return Math.floor(Math.random() * 10000000) + 1;
};

export const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const changeRgbaAlpha = (rgba, newAlpha) => {
  const parts = rgba.split(",");
  parts[3] = `${newAlpha})`;
  return parts.join(",");
};

export const parseDate = (date) => {
  if (!date) return "TBD";
  const time = moment(date);
  return time.format("HH:mm:ss DD/MM");
};

export const isValidIP = (ip) => {
  const ipv4Pattern =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
};

export const scanOptions = [
  "-sn",
  "-sV",
  "-p-",
  "-A",
  "-sS",
  "-sU",
  "-T2",
  "-F",
  "-r",
  "-sC",
  "-O",
  "-d",
  "--reason",
  "--packet-trace",
  "--iflist",
  "-6",
];

export const argsDescriptionMap = {
  "-sn": "Ping scan only",
  "-sV": "Version detection",
  "-p-": "Scan all ports",
  "-A": "Aggressive scan",
  "-sS": "TCP SYN scan",
  "-sU": "UDP scan",
  "-T2": "Timing template",
  "-F": "Fast scan",
  "-r": "Scan sequentially",
  "-sC": "Default scripts",
  "-O": "OS detection",
  "-d": "Debug mode",
  "--reason": "Display reason",
  "--packet-trace": "PT",
  "--iflist": "Show interfaces",
  "-6": "Use IPv6",
  "--privileged": "Run as root",
  "--unprivileged": "Run as non-root",
};

export const scanTypes = {
  "-sn": "Network Discovery",
  "-sV": "Version Detection",
  "-p-": "Full Port Scan",
  "-A": "Aggressive Scan",
  "-sS": "Stealth Scan",
  "-sU": "UDP Scan",
  "-T2": "Slow Scan",
  "-F": "Fast Scan",
  default: "Standard Scan",
};

export const ascii = `
* VulnControl v1.0 By Andrey
. . . . . . . . . . . . . . . .                                            

`;
