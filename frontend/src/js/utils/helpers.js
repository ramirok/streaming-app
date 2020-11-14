import { domElements } from "../view/view.js";
import { initGoogle } from "./google.js";

export const formatName = (string) => {
  return string
    .charAt(0)
    .toUpperCase()
    .concat(string.substring(1))
    .replace(/-/g, " ");
};

const offlineMode =
  '<button id="offline" class="button button-medium" style="position: absolute; left: 0; border-radius:15px; animation-name: longButton; animation-duration: 0.3s; animation-fill-mode: forwards;"><i class="fas fa-exclamation"></i>&nbsp;Offline</button>';

export const handleConnection = () => {
  if (navigator.onLine) {
    return isReachable(window.location.origin).then(function (online) {
      if (online) {
        // handle online status
        initGoogle();
        if (document.getElementById("offline")) {
          document.getElementById("offline").remove();
        }
        domElements.googleBtn.style.display = "block";
      } else {
        console.log("no connectivity");
      }
    });
  } else {
    // handle offline status
    domElements.googleBtn.style.display = "none";
    document
      .querySelector(".upper-buttons")
      .insertAdjacentHTML("afterbegin", offlineMode);
  }
};

const isReachable = (url) => {
  return fetch(url, { method: "HEAD", mode: "no-cors" })
    .then(function (resp) {
      return resp && (resp.ok || resp.type === "opaque");
    })
    .catch(function (err) {
      console.warn("[conn test failure]:", err);
    });
};

export const spinner = '<div class="loader">Loading...</div>';

export const showSpinner = (domElement) => {
  domElement.insertAdjacentHTML("afterbegin", spinner);
  domElement.lastChild.style.display = "none";
};

export const hideSpinner = (domElement) => {
  domElement.lastChild.style.display = "block";
  domElement.firstChild.remove();
};
