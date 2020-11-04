const connection = require("../db");

// get playlist by genre
const sendPlaylist = (req, res) => {
  const category = req.params.playlist;
  const q = `SELECT id,track_name,artist FROM tracks WHERE genre="${category}"`;
  connection.query(q, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

module.exports = { sendPlaylist };
