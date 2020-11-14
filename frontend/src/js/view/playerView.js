import { domElements } from "./view.js";

// play/pause button style
export const changePlayButtonStyle = (isPlaying) => {
  if (isPlaying) {
    domElements.player.classList.add("play");
    domElements.playBtn.querySelector("i.fas").classList.remove("fa-play");
    domElements.playBtn.querySelector("i.fas").classList.add("fa-pause");
  } else {
    domElements.player.classList.remove("play");
    domElements.playBtn.querySelector("i.fas").classList.add("fa-play");
    domElements.playBtn.querySelector("i.fas").classList.remove("fa-pause");
  }
};

// format time tags in 00:00
const formatTime = (seconds) => {
  if (!seconds) {
    return "00:00";
  }
  const seconds2Digits = Math.round(seconds);
  let min = Math.floor(seconds2Digits / 60);
  let sec = seconds2Digits % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  return min + ":" + sec;
};

// update progress bar
export const updateProgress = (e) => {
  const { currentTime, duration } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  domElements.progress.style.width = `${progressPercent}%`;
};

// manually set progress bar
export const setProgress = (e) => {
  const width = domElements.progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = domElements.audio.duration;

  domElements.audio.currentTime = (clickX / width) * duration;
};

// update time tags
export const updateTimeTags = () => {
  domElements.currentTime.innerText = formatTime(domElements.audio.currentTime);
  domElements.totalTiem.innerText = formatTime(domElements.audio.duration);
};

// like button style
export const changeLikeButtonStyle = (liked) => {
  if (liked) {
    domElements.likeBtn.classList.add("active");
  } else {
    domElements.likeBtn.classList.remove("active");
  }
};
