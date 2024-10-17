export const createBearerToken = (storageName) => {
  const raw = localStorage.getItem(storageName);
  const token = raw.replace(/"/g, "");
  return `Bearer ${token}`;
};

export const randomNum = () => {
  return Math.floor(Math.random() * 10000000) + 1;
};
