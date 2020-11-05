const mysql = require("mysql");
const config = require("./utils/config");
const { promisify } = require("util");

// db config
const db_config = {
  host: "bjcmyzpeft7trd7bqgae-mysql.services.clever-cloud.com",
  user: "uj3d28nhyvjygrps",
  password: config.DB_PASSWORD,
  database: "bjcmyzpeft7trd7bqgae",
  connectionLimit: 10,
};

const pool = mysql.createPool(db_config);

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    }

    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TO MANY CONNECTION");
    }

    if (error.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    }
  }

  if (connection) connection.release();
  console.log("DB is connected");
  return;
});

pool.on("error", (errro) => {
  console.log("SE DESCONECTO!!");
});

pool.query = promisify(pool.query);

module.exports = pool;

// let connection;

// const handleDisconnect = () => {
//   connection = mysql.createConnection(db_config);

//   connection.connect(function (err) {
//     if (err) {
//       console.log("error when connecting to db:", err);
//       setTimeout(handleDisconnect, 2000);
//     }
//   });

//   connection.on("error", function (err) {
//     console.log("db error", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       handleDisconnect();
//     } else {
//       throw err;
//     }
//   });
// };

// handleDisconnect();

// module.exports = connection;
