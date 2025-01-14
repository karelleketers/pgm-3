const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

let source;

let audio = null;
let audioSource = null;

// const gainNode = audioContext.createGain();
// const panNode = audioContext.createStereoPanner();
// const filterNode = audioContext.createBiquadFilter();
// filterNode.type = filterNode.LOWPASS;
// filterNode.frequency.value = 3000;

const app = {
  init() {
    this.cacheElements();
    this.registerListeners();
  },

  bufferSong() {},
  cacheElements() {
    this.$audioEl = document.querySelector("audio");
    this.$songselector = document.querySelector("#songselector");
    this.$playBtn = document.querySelector("#play");
    this.$stopBtn = document.querySelector("#stop");
    this.$volumeInp = document.querySelector("#volume");
    this.$panInp = document.querySelector("#pan");
    this.$filterInp = document.querySelector("#filter");
  },
  registerListeners() {
    this.$songselector.addEventListener("change", () => {
      this.stopMusic();
    });

    this.$playBtn.addEventListener("click", () => {
      // check if context is in suspended state (autoplay policy)
      audioContext.state === "suspended" ? audioContext.resume() : "";
      this.playMusic();
    });

    this.$stopBtn.addEventListener("click", () => {
      this.stopMusic();
    });

    this.$volumeInp.addEventListener("input", function () {
      // change gain
    });

    this.$panInp.addEventListener("input", function () {
      // change pan
    });

    this.$filterInp.addEventListener("input", function () {
      // change filter
    });
  },
  playMusic() {
    this.$playBtn.disabled = true;
    this.$stopBtn.disabled = false;

    this.bufferSong();
  },
  stopMusic() {
    this.$stopBtn.disabled = true;
    this.$playBtn.disabled = false;
  },
};

document.addEventListener("DOMContentLoaded", app.init());
/* made with <3 4 PGM-3 */
