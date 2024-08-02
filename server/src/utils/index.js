export const sleep = async (ms) => {
  return await new Promise((resolve) => setInterval(resolve, ms));
};
