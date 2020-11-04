const mysql = require("mysql");
const config = require("./utils/config");

// db config
const db_config = {
  host: "bjcmyzpeft7trd7bqgae-mysql.services.clever-cloud.com",
  user: "uj3d28nhyvjygrps",
  password: config.DB_PASSWORD,
  database: "bjcmyzpeft7trd7bqgae",
};

let connection;

const handleDisconnect = () => {
  connection = mysql.createConnection(db_config);

  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

handleDisconnect();

module.exports = connection;
