const User = require("../Models/User");
const JWT = require("jsonwebtoken");

exports.userAuthentication = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied: Authenticate first" });
  }

  try {
    const decoded = JWT.verify(token.replace("Bearer ", ""), "Fushaar");

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {

    res.status(401).json({ error: "Authentication failed" });
  }
};
