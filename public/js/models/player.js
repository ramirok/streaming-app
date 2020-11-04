import { domElements, customEvents } from "../view/view.js";
import { formatName } from "../utils/helpers.js";

// load song details into player
const loadSong = (state) => ({
  load(songId) {
    // load song details if new song !== last played song
    if (songId !== state.lastPlayed) {
      // query song from list by song id
      const song = domElements.songsList.querySelector(`[data-id="${songId}"]`);

      // update dom elements
      domElements.title.innerText = formatName(song.dataset.name);
      domElements.artist.innerHTML = song.dataset.artist;
      domElements.audio.src = `/api/track/${song.dataset.name}`;
      domElements.cover.src = `images/${song.dataset.name}.jpg`;

      // update lastPlayed song
      state.lastPlayed = parseInt(songId);

      // saves new lastPlayed to localStorage
      const saved = localStorage.getItem("config");
      if (saved) {
        const parsedSaved = JSON.parse(saved);
        parsedSaved.lastPlayed = parseInt(songId);
        localStorage.setItem("config", JSON.stringify(parsedSaved));
      }

      // dispatch evet for checking like status for like button
      document.dispatchEvent(customEvents.checkLikeStatus);
    }
  },
});

// play song
const playSong = (state) => ({
  play() {
    // change playing status
    state.playing = true;

    // play loaded song
    domElements.audio.play();

    // dispatch event for checking active song style
    document.dispatchEvent(customEvents.checkActiveSongStatus);
  },
});

// pause song
const pauseSong = (state) => ({
  pause() {
    // change playing status
    state.playing = false;

    // pause song
    domElements.audio.pause();

    // dispatch event for checking active song style
    document.dispatchEvent(customEvents.checkActiveSongStatus);
  },
});

// prev song
const prevSong = (state) => ({
  prev() {
    // query song from rendered list by song id
    const prev =
      domElements.songsList.querySelector(`[data-id="${state.lastPlayed}"]`)
        .previousSibling || domElements.songsList.lastChild;

    // return new song id
    return prev.dataset.id;
  },
});

// next song
const nextSong = (state) => ({
  next() {
    // query song from rendered list by song id
    const next =
      domElements.songsList.querySelector(`[data-id="${state.lastPlayed}"]`)
        .nextSibling || domElements.songsList.firstChild;

    // return new song id
    return next.dataset.id;
  },
});

// save song id in like state
const like = (state) => ({
  saveLikes(newLikes) {
    state.liked = newLikes;
  },
});

// song object composition
const Player = () => {
  const state = {
    lastPlayed: null, //last played song, updates with load()
    playing: false, //playing status
    liked: [], //liked songs
    inFavs: false, //true if current playlist is user's favs
  };

  return Object.assign(
    state,
    loadSong(state),
    playSong(state),
    pauseSong(state),
    prevSong(state),
    nextSong(state),
    like(state)
  );
};

export default Player;
