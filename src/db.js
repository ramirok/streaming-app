const mysql = require("mysql");
const config = require("./utils/config");

// connect to mysql DB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: config.DB_PASSWORD,
  database: "streaming_app",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
