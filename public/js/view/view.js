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

// color schemes (css variables)
export const colorSchemes = {
  scheme1: {
    "--main-bg-color": "#5785ff",
    "--main-bg-gradient": "linear-gradient(145deg, #5d8eff, #4e78e6)",
    "--main-bg-gradient-inverted": "linear-gradient(145deg, #4e78e6, #5d8eff)",
    "--secondary-bg-color": "#e7eaef",
    "--secondary-bg-gradient": "linear-gradient(145deg, #f7faff, #d0d3d7)",
    "--box-shadow": "8px 8px 16px #b9bbbf, -8px -8px 16px #ffffff",
    "--text-color": "#515c71",
    "--border-color": "#ddd",
    "--active-song-bg": "#d0dcf4",
  },
  scheme2: {
    "--main-bg-color": "#C93309",
    "--main-bg-gradient": "linear-gradient(145deg, #ea520b, #c54509)",
    "--main-bg-gradient-inverted": "linear-gradient(145deg, #c54509, #ea520b)",
    "--secondary-bg-color": "#e7eaef",
    "--secondary-bg-gradient": "linear-gradient(145deg, #f7faff, #d0d3d7)",
    "--box-shadow": "8px 8px 16px #b9bbbf, -8px -8px 16px #ffffff",
    "--text-color": "#515c71",
    "--border-color": "#ddd",
    "--active-song-bg": "#E9C3AD",
  },
  scheme3: {
    "--main-bg-color": "#5785ff",
    "--main-bg-gradient": "linear-gradient(145deg, #5d8eff, #4e78e6)",
    "--main-bg-gradient-inverted": "linear-gradient(145deg, #4e78e6, #5d8eff)",
    "--secondary-bg-color": "#30353A",
    "--secondary-bg-gradient": "linear-gradient(145deg, #33393e, #2b3034)",
    "--box-shadow": " 9px 9px 26px #1e2125,-5px -5px 26px #42494f",
    "--text-color": "#eee",
    "--border-color": "#333",
    "--active-song-bg": "#4164c1",
  },
  scheme4: {
    "--main-bg-color": "#C93309",
    "--main-bg-gradient": "linear-gradient(145deg, #ea520b, #c54509)",
    "--main-bg-gradient-inverted": "linear-gradient(145deg, #c54509, #ea520b)",
    "--secondary-bg-color": "#30353A",
    "--secondary-bg-gradient": "linear-gradient(145deg, #33393e, #2b3034)",
    "--box-shadow": " 9px 9px 26px #1e2125,-5px -5px 26px #42494f",
    "--text-color": "#eee",
    "--border-color": "#333",
    "--active-song-bg": "#a53e05",
  },
};

// genre list
export const genres = ["electro", "relaxing", "rock"];
