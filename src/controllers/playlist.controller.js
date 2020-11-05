const pool = require("../db");

const sendPlaylist = async (req, res) => {
  const category = req.params.playlist;
  try {
    const q = `SELECT id,track_name,artist FROM tracks WHERE genre="${category}"`;
    const result = await pool.query(q);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

module.exports = { sendPlaylist };
