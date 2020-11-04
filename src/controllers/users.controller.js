const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const config = require("../utils/config");
const connection = require("../db");

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
    const user = {
      user: payload.sub,
    };
    connection.query("INSERT INTO users SET ?", user, (error, result) => {
      if (error) {
        // if error is duplicated entry, ignores
        if (error.code !== "ER_DUP_ENTRY") throw error;
      }
    });

    // sign and send JWT
    const token = jwt.sign(
      { email: payload.email, user_id: payload.sub },
      config.JWT_SECRET
    );
    res.json(token);
  } catch (error) {
    console.log(error);
  }
};

// get favs playlist
const getLikes = async (req, res) => {
  try {
    connection.query(
      `SELECT track_id FROM likes WHERE user_id=${req.user.user_id}`,
      (error, result) => {
        res.json(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// add song to favs playlist
const postLikes = async (req, res) => {
  try {
    // add like
    const like = {
      user_id: req.user.user_id,
      track_id: req.body.trackId,
    };
    connection.query("INSERT INTO likes SET ?", like, (error, result) => {
      if (error) {
        // if error is duplicated entry, ignores
        if (error.code !== "ER_DUP_ENTRY") throw error;
      }
    });

    // return favs playlist
    connection.query(
      `SELECT track_id FROM likes WHERE user_id=${like.user_id}`,
      (error, result) => {
        res.json(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// remove song from favs playlist
const deleteLikes = async (req, res) => {
  // uses req.user.user_id from auth middleware
  try {
    // delete like
    connection.query(
      `DELETE FROM likes WHERE user_id=${req.user.user_id} AND track_id=${req.body.trackId}`,
      (error, result) => {
        if (error) {
          // if error is duplicated entry, ignores
          if (error.code !== "ER_DUP_ENTRY") throw error;
        }
      }
    );

    // return favs playlist
    connection.query(
      `SELECT track_id FROM likes WHERE user_id=${req.user.user_id}`,
      (error, result) => {
        res.json(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// get user's favs playlist
const getFavsPlaylist = (req, res) => {
  // uses req.user.user_id from auth middleware
  try {
    connection.query(
      `SELECT tracks.id,tracks.track_name,tracks.artist FROM tracks JOIN likes ON tracks.id = likes.track_id WHERE likes.user_id =${req.user.user_id}`,
      (error, result) => {
        res.json(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  getLikes,
  postLikes,
  deleteLikes,
  getFavsPlaylist,
};
