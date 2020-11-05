const express = require("express");
const auth = require("./utils/auth");
const trackController = require("./controllers/track.controller");
const playlistController = require("./controllers/playlist.controller");
const userController = require("./controllers/users.controller");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/users", userController.loginUser);
app.get("/api/users/like", auth, userController.getLikes);
app.post("/api/users/like", auth, userController.postLikes);
app.get("/api/users/favs", auth, userController.getFavsPlaylist);

app.get("/api/playlist/:playlist", playlistController.sendPlaylist);

app.get("/api/track/:track", trackController.streamTrack);

module.exports = app;
