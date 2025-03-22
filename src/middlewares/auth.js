const { verifyToken } = require("../services/firebase");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    req.user = await verifyToken(token);
    next();
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};

module.exports = authenticate;
