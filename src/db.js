const mysql = require("mysql");
const config = require("./utils/config");

// connect to mysql DB
const connection = mysql.createConnection({
  host: "bjcmyzpeft7trd7bqgae-mysql.services.clever-cloud.com",
  user: "uj3d28nhyvjygrps",
  password: config.DB_PASSWORD,
  database: "bjcmyzpeft7trd7bqgae",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
