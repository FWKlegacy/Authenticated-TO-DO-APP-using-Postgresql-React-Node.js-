/*const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Save the user info to req.user
    next();
  });
};

module.exports = authenticateToken;*/
