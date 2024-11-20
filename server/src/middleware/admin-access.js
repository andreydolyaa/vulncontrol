export const verifyAdminAccess = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "Access denied" });
  }

  if (token !== `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`) {
    return res.status(403).send({ message: "Unauthorized access" });
  }

  next();
};
