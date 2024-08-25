const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token has expired" });
    }
    return res.status(403).send({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
