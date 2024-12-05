const jwt = require("jsonwebtoken");
require("dotenv").config;

function jwtgenarator(email) {
  const payload = {
    user: email,
  };

  const JWT_TOKEN = process.env.JWT;
  return jwt.sign(payload, JWT_TOKEN, { expiresIn: "1hr" });
}

module.exports = jwtgenarator;
