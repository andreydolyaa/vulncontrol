import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "Access denied: No token provided" });
  }

  try {
    const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
    console.log(token," #@$#@$ @# $@#$#@ #@ $@# $#@ $#@ $#@ $@# $#@ $#@ # @$");
    
    const decoded = jwt.verify(raw, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};
