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