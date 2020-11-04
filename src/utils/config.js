require("dotenv").config();

const PORT = process.env.PORT;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = { PORT, GOOGLE_CLIENT_ID, JWT_SECRET, DB_PASSWORD };
