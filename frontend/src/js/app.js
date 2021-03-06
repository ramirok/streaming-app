// import { domElements, colorSchemes, customEvents } from "./view/view.js";
// console.log(colorSchemes);
import { domElements, customEvents } from "./view/view.js";
import Player from "./models/player.js";
import {
  changePlayButtonStyle,
  updateProgress,
  setProgress,
  updateTimeTags,
  changeLikeButtonStyle,
} from "./view/playerView.js";
import SongList from "./models/songList.js";
import { renderList, changeActiveSongStyle } from "./view/songListView.js";
import Menu from "./models/menu.js";
import { renderGenreMenu, renderThemeMenu } from "./view/menuView.js";
import { auth2, changeGoogleBUtnStyle } from "./utils/google.js";
import { handleConnection, showSpinner, hideSpinner } from "./utils/helpers";

import "../style.css";
// ----------------------------------------------------
// for PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered", err));
}

// ----------------------------------------------------

// ----- STATE INITIALIZATIONS -----

// initialize player object
const player = Player();

// initialize songList object
const list = SongList();

// initialize menu object
const menu = Menu();

// ----- CONTROLLERS -----

const listController = {
  // fetch and render playlist
  getList: async (url) => {
    // show loader animation while fetching
    domElements.songsList.innerHTML = "";
    domElements.songsList.insertAdjacentElement(
      "beforeend",
      domElements.playlistSpinner
    );

    // fetch playlist
    await list.get(url);

    // render list
    renderList(list.list);

    // if playing dispatch event for activeSong styling
    if (player.playing) {
      document.dispatchEvent(customEvents.checkActiveSongStatus);
    }

    // add on click event in each song
    document.querySelectorAll(".song").forEach((element) => {
      element.addEventListener("click", () => {
        if (
          player.playing &&
          player.lastPlayed === parseInt(element.dataset.id)
        ) {
          // if clicks on the same song, pause()
          player.pause();
        } else {
          // if clicks in a diferent song, load() new song and play()
          player.load(element.dataset.id);
          player.play();
        }
      });
    });
  },
};

const playerController = {
  // press play button
  pressPlay: () => {
    if (player.playing) {
      // if ite's playing, pause
      player.pause();
    } else {
      // if ite's paused, load lastPlayed or 1st in list and play
      player.load(
        player.lastPlayed || domElements.songsList.children[0].dataset.id
      );
      player.play();
    }
  },

  // press prev button
  pressPrev: () => {
    // load next song in the list and play
    const newSong = player.prev();
    player.load(newSong);
    player.play();
  },

  // press next button
  pressNext: () => {
    // load previous song in the list and play
    const newSong = player.next();
    player.load(newSong);
    player.play();
  },

  // press like button
  pressLike: async () => {
    // add or delete lastPlayed song from favs list
    if (player.lastPlayed) {
      const response = await fetch("/api/users/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("sesion"))}`,
        },
        body: JSON.stringify({
          trackId: player.lastPlayed,
        }),
      });

      // save liked songs
      const parsedResponse = await response.json();
      player.saveLikes(parsedResponse.map((ob) => ob.track_id));

      // // if current songList is favs, fetch and render again
      if (player.inFavs) {
        listController.getList("users/favs");
      }

      // dispatch event for checking likeStatus (styling)
      document.dispatchEvent(customEvents.checkLikeStatus);
    }
  },
};

const menuController = {
  // show/hide colorScheme menu
  toggleColorSchemeMenu: () => {
    const visible = document.getElementById("menu-palette");
    if (visible) {
      // if menu is visible, remove it
      visible.parentNode.removeChild(visible);
      domElements.colorPalette.classList.remove("active");
    } else {
      //render menu
      renderThemeMenu();

      //query current applied color scheme and add active style
      document.getElementById(menu.colorScheme).classList.add("active");

      //add event listener to every option in the menu
      document
        .getElementById("menu-palette")
        .querySelectorAll("li")
        .forEach((el) => {
          el.addEventListener("click", (e) => {
            e.stopPropagation();

            // set css variables
            document.querySelector(":root").classList = "";
            document.querySelector(":root").classList.add(el.id);

            // remove menu
            const visible = document.getElementById("menu-palette");
            visible.parentNode.removeChild(visible);
            domElements.colorPalette.classList.remove("active");

            // save current colorScheme to localStorage
            menu.saveColorScheme(el.id);
          });
        });
    }
  },

  // show/hide genre menu
  toggleGenreMenu: () => {
    const visible = document.getElementById("menu-genre");
    if (visible) {
      // if menu is visible, remove it
      visible.parentNode.removeChild(visible);
      domElements.genreBtn.classList.remove("active");
    } else {
      //render menu
      renderGenreMenu();

      //query current applied color scheme and add active style
      document.getElementById(menu.genre).classList.add("active");

      //add event listener to every option in the menu
      document
        .getElementById("menu-genre")
        .querySelectorAll("li")
        .forEach((el) => {
          el.addEventListener("click", (e) => {
            e.stopPropagation();

            //when click on a genre, quit favs
            player.inFavs = false;
            domElements.likePlayList.classList.remove("active");

            // fetch and render list
            listController.getList(`playlist/${el.id}`);

            // remove menu
            const visible = document.getElementById("menu-genre");
            visible.parentNode.removeChild(visible);
            domElements.genreBtn.classList.remove("active");

            // save current genre to localStorage
            menu.saveGenre(el.id);
          });
        });
    }
  },
};

// ----- EVENT LISTENERS -----

window.addEventListener("online", async () => {
  await handleConnection();
  // fetch and render list of current genre(saved to localStorage)
  await listController.getList(`playlist/${menu.genre}`);
  // if logged in, fetch user's likes
  if (localStorage.getItem("sesion")) {
    const response = await fetch("/api/users/like", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("sesion"))}`,
      },
    });
    const parsedResponse = await response.json();
    player.saveLikes(parsedResponse.map((ob) => ob.track_id));
  }

  // load lastPlayed song from localStorage
  const saved = localStorage.getItem("lastPlayed");
  if (saved) {
    const parsedSaved = JSON.parse(saved);
    player.load(parsedSaved);
  }
});

window.addEventListener("offline", async () => {
  await handleConnection();

  // fetch and render list of current genre(saved to localStorage)
  // WILL RENDER A LIST ITEM = NO CONNECTION
  await listController.getList(`playlist/${menu.genre}`);
});

window.addEventListener("load", async () => {
  await handleConnection();
  // fetch and render list of current genre(saved to localStorage)
  await listController.getList(`playlist/${menu.genre}`);
  // if logged in, fetch user's likes
  if (localStorage.getItem("sesion") && !document.getElementById("offline")) {
    const response = await fetch("/api/users/like", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("sesion"))}`,
      },
    });
    const parsedResponse = await response.json();
    player.saveLikes(parsedResponse.map((ob) => ob.track_id));
  }

  // load lastPlayed song from localStorage
  const saved = localStorage.getItem("lastPlayed");
  if (saved) {
    const parsedSaved = JSON.parse(saved);
    player.load(parsedSaved);
  }
});

// play/pause button event
domElements.playBtn.addEventListener("click", () => {
  playerController.pressPlay();
});

// change song with prev/next buttons
domElements.prevBtn.addEventListener("click", () => {
  playerController.pressPrev();
});
domElements.nextBtn.addEventListener("click", () => {
  playerController.pressNext();
});

// next song when song ends
domElements.audio.addEventListener("ended", () => {
  playerController.pressNext();
});

// like song button
domElements.likeBtn.addEventListener("click", async () => {
  if (localStorage.getItem("sesion")) {
    showSpinner(domElements.likeBtn);

    // if likeBtn is active (blue background, show inverted spinner)
    if (domElements.likeBtn.classList.contains("active")) {
      domElements.likeBtn.firstChild.classList.add("inverted");
    }

    await playerController.pressLike();
    hideSpinner(domElements.likeBtn);
  } else {
    // if logged out, change login button style
    changeGoogleBUtnStyle();
  }
});

// update progress bar
domElements.audio.addEventListener("timeupdate", (e) => {
  updateProgress(e);
  updateTimeTags();
});

// manually set progress bar
domElements.progressContainer.addEventListener("click", setProgress);

// custom event, set like button style for liked songs
document.addEventListener("checkLikeStatus", async () => {
  if (localStorage.getItem("sesion")) {
    changeLikeButtonStyle(player.liked.includes(player.lastPlayed));
  }
});

// custom event, set play buttton and song style for current playing song
document.addEventListener("checkActiveSongStatus", () => {
  changeActiveSongStyle(player.lastPlayed);
  changePlayButtonStyle(player.playing);
});

// color scheme button
domElements.colorPalette.addEventListener("click", (e) => {
  e.stopPropagation();
  menuController.toggleColorSchemeMenu();
});

// genre button
domElements.genreBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuController.toggleGenreMenu();
});

// logout button
domElements.logoutBtn.addEventListener("click", () => {
  auth2.signOut().then(() => {
    localStorage.removeItem("sesion"); //remove token
    window.location.reload();
  });
});

// favs playlist button
domElements.likePlayList.addEventListener("click", async () => {
  if (localStorage.getItem("sesion")) {
    showSpinner(domElements.likePlayList);
    if (player.inFavs) {
      // if favs playlist is active, switch back to last seen genre
      domElements.likePlayList.classList.remove("active");
      //fetch and render last seen genre
      await listController.getList(`playlist/${menu.genre}`);
      player.inFavs = false;

      hideSpinner(domElements.likePlayList);
    } else {
      //fetch and render favs playlist
      await listController.getList("users/favs");
      domElements.likePlayList.classList.add("active");
      player.inFavs = true;
      hideSpinner(domElements.likePlayList);
    }
  } else {
    // if logged out, change login button style
    changeGoogleBUtnStyle();
  }
});

// close menus if clicked anywhere away in the app
window.addEventListener("click", () => {
  const visible = document.querySelector(".dropDownMenu");
  if (visible) {
    if (visible.id === "menu-palette") {
      menuController.toggleColorSchemeMenu();
    }
    if (visible.id === "menu-genre") {
      menuController.toggleGenreMenu();
    }
  }
});
