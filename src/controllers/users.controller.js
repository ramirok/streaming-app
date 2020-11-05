const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const config = require("../utils/config");
const pool = require("../db");

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

// google login
const loginUser = async (req, res) => {
  try {
    // verify google acces token
    const ticket = await client.verifyIdToken({
      idToken: req.header("Authorization").replace("Bearer ", ""),
      audience: config.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // add new user to DB

    const result = await pool.query(
      `SELECT id FROM users WHERE user=${payload.sub}`
    );

    let user_id;
    if (!result[0]) {
      const newUser = await pool.query("INSERT INTO users SET ?", [
        { user: payload.sub },
      ]);
      user_id = newUser.insertId;
    } else {
      user_id = result[0].id;
    }

    // sign and send JWT
    const token = jwt.sign(
      { email: payload.email, user_id },
      config.JWT_SECRET
    );
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

// get favs playlist
const getLikes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT track_id FROM likes WHERE user_id=${req.user.user_id}`
    );

    res.json(result);
  } catch (error) {
    res.status(500).end();
    console.log(error);
  }
};

// add or remove song to favs playlist
const postLikes = async (req, res) => {
  try {
    // add like
    const like = {
      user_id: req.user.user_id,
      track_id: req.body.trackId,
    };

    // query user's likes
    let result = await pool.query(
      `SELECT track_id FROM likes WHERE user_id=${like.user_id}`
    );

    // check if song is liked
    const exist = result.findIndex((el) => el.track_id === like.track_id);

    if (exist < 0) {
      // if not liked, add
      await pool.query("INSERT INTO likes SET ?", [like]);
      result.push({ track_id: like.track_id });
    } else {
      // if liked, remove
      await pool.query(
        `DELETE FROM likes WHERE user_id=${like.user_id} AND track_id=${like.track_id}`
      );
      result.splice(exist, 1);
    }

    // return favs playlist
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

// get user's favs playlist
const getFavsPlaylist = async (req, res) => {
  // uses req.user.user_id from auth middleware
  try {
    const result = await pool.query(
      `SELECT tracks.id,tracks.track_name,tracks.artist FROM tracks JOIN likes ON tracks.id = likes.track_id WHERE likes.user_id =${req.user.user_id}`
    );

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

module.exports = {
  loginUser,
  getLikes,
  postLikes,
  getFavsPlaylist,
};
