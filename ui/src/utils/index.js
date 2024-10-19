export const createBearerToken = (storageName) => {
  const raw = localStorage.getItem(storageName);
  const token = raw.replace(/"/g, "");
  return `Bearer ${token}`;
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
  "--packet-trace": "Packet trace",
  "--iflist": "Show interfaces",
  "-6": "Use IPv6",
  "--privileged": "Run as root",
  "--unprivileged": "Run as non-root",
};
