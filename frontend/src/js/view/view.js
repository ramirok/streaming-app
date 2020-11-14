const _ = (id) => {
  return document.getElementById(id);
};

// DOM elements
export const domElements = {
  player: _("player"),
  playBtn: _("play"),
  prevBtn: _("prev"),
  nextBtn: _("next"),
  audio: _("audio"),
  progress: _("progress"),
  progressContainer: _("progress-bar"),
  title: _("title"),
  artist: _("artist"),
  cover: _("cover"),
  songsList: _("songs-list"),
  currentTime: _("current-time"),
  totalTiem: _("total-time"),
  colorPalette: _("color-palette"),
  likePlayList: _("fav-play-list"),
  likeBtn: _("toggle-like"),
  genreBtn: _("genre"),
  googleBtn: _("my-signin2"),
  logoutBtn: _("logout"),
  playlistSpinner: _("playlist-spinner"),
};

// custom events
export const customEvents = {
  checkLikeStatus: new CustomEvent("checkLikeStatus", {
    detail: "for stylyng like button",
  }),
  checkActiveSongStatus: new CustomEvent("checkActiveSongStatus", {
    detail: "for styling playing song",
  }),
};

// color schemes (get css variables for displaying circle next to name in menu)
export const colorSchemes = {
  scheme1: {
    "main-color": getComputedStyle(document.documentElement).getPropertyValue(
      "--blue-1"
    ),
    "secondary-color": getComputedStyle(
      document.documentElement
    ).getPropertyValue("--white-1"),
  },
  scheme2: {
    "main-color": getComputedStyle(document.documentElement).getPropertyValue(
      "--orange-1"
    ),
    "secondary-color": getComputedStyle(
      document.documentElement
    ).getPropertyValue("--white-1"),
  },
  scheme3: {
    "main-color": getComputedStyle(document.documentElement).getPropertyValue(
      "--blue-1"
    ),
    "secondary-color": getComputedStyle(
      document.documentElement
    ).getPropertyValue("--grey-1"),
  },
  scheme4: {
    "main-color": getComputedStyle(document.documentElement).getPropertyValue(
      "--orange-1"
    ),
    "secondary-color": getComputedStyle(
      document.documentElement
    ).getPropertyValue("--grey-1"),
  },
};

// genre list
export const genres = ["electro", "relaxing", "rock"];
