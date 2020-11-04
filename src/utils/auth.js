const jwt = require("jsonwebtoken");
const config = require("./config");

// auth middleware
const auth = async (req, res, next) => {
  try {
    // extracts token from header
    const token = req.header("Authorization").replace("Bearer ", "");

    // verifies token a finds user from id in decoded data
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // attach decoded info user to request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send({ message: "Please authenticate." });
  }
};

module.exports = auth;
