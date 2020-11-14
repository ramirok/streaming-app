import { domElements } from "./view.js";
import { formatName } from "../utils/helpers.js";

// change active class in current playing song
export const changeActiveSongStyle = (lastPlayed) => {
  // new loaded song
  const newSong = domElements.songsList.querySelector(
    `[data-id="${lastPlayed}"]`
  );

  // currently playing song
  const songPlaying = domElements.songsList.querySelector(".active");

  if (songPlaying) {
    // if a song is playing, remove active style
    songPlaying.classList.remove("active");
    songPlaying.querySelector("i.fas").classList.add("fa-play");
    songPlaying.querySelector("i.fas").classList.remove("fa-pause");
  }

  if (newSong !== songPlaying) {
    // if the new loaded song is diferent, add active style to the new song
    newSong.classList.add("active");
    newSong.querySelector("i.fas").classList.remove("fa-play");
    newSong.querySelector("i.fas").classList.add("fa-pause");
  }
};

// render play list
export const renderList = (songsArray) => {
  // empty last playlist
  domElements.songsList.innerHTML = "";
  if (!songsArray) {
    const html = `<li class="songs-list song"><h5>No connection...</h5></li>`;
    domElements.songsList.insertAdjacentHTML("beforeend", html);
    return;
  } else if (songsArray.length < 1) {
    const html = `<li class="songs-list song"><h5>No songs...</h5></li>`;
    domElements.songsList.insertAdjacentHTML("beforeend", html);
    return;
  }

  songsArray.forEach((element, index) => {
    const html = `<li class="songs-list song" id="song" data-name="${
      element.track_name
    }"data-id="${element.id}" data-artist="${element.artist}">
    <span class="button button-small">${index + 1}</span><span>
    <h5>${formatName(element.track_name)}</h5><h6>${element.artist}</h6>
    </span><button class="button button-medium"><i class="fas fa-play"></i></button>
    </li>`;
    domElements.songsList.insertAdjacentHTML("beforeend", html);
  });
};
