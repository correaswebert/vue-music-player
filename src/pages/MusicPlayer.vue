<template>
  <div class="player-container">
    <SongCover
      class="cover"
      :albumArtUrl="current.cover"
      :title="current.title"
      :artist="current.artist"
    />

    <div class="slider">
      <span class="time-stamp" v-if="currentTime">{{ formatTime(currentTime) }}</span>
      <span class="time-stamp" v-else-if="duration">0:00</span>
      <span class="time-stamp" v-else>--:--</span>

      <input
        type="range"
        v-model="currentTime"
        :max="duration"
        @change="updateCurrentTime"
      />

      <span class="time-stamp" v-if="duration">{{ formatTime(duration) }}</span>
      <span class="time-stamp" v-else>--:--</span>
    </div>

    <Controls
      :isPlaying="isPlaying"
      @play="play"
      @pause="pause"
      @prev="prev"
      @next="next"
      @loop="loop"
      @shuffle="shuffle"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SongCover from "../components/SongCover.vue";
import Controls from "../components/Controls.vue";

interface Song {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

@Component({
  components: {
    SongCover,
    Controls,
  },
})
export default class Home extends Vue {
  index = 0;

  current!: Song;
  duration = 0;
  currentTime = 0;
  intervalId!: number;

  isPlaying = false;
  isLoaded = false;

  player = new Audio();

  songs: Song[] = [
    {
      title: "Photograph",
      artist: "Ed Sheeran",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Ed_Sheeran-Photograph.mp3"),
      cover: "",
    },
    {
      title: "Not Today",
      artist: "Imagine Dragons",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Imagine_Dragons-Not_Today.mp3"),
      cover: "",
    },
    {
      title: "Khuda Jaane",
      artist: "Kay Kay",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Khuda_Jaane.mp3"),
      cover: "",
    },
  ];

  load() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
    this.isLoaded = true;
  }

  formatTime(time: number): string {
    const ss = time % 60;
    const mm = Math.floor(time / 60);
    return `${mm}:${ss > 9 ? ss : "0" + ss}`;
  }

  // BUG: currently, if function is run when the intervalTimer is incrementing
  //      then slider will not update...
  // Have to give the slider more precedence over the interval updater
  updateCurrentTime() {
    this.player.currentTime = this.currentTime;
  }

  play() {
    if (!this.isLoaded) this.load();

    this.isPlaying = true;
    this.player
      .play()
      .then(() => {
        this.duration = Math.floor(this.player.duration);

        this.intervalId = setInterval(() => {
          this.currentTime = Math.floor(this.player.currentTime);
        }, 1000);
      })
      .catch((err) => console.log(err));

    this.player.addEventListener("ended", this.next);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.intervalId);
    this.player.pause();
  }

  next() {
    this.index++;
    if (this.index > this.songs.length - 1) this.index = 0;

    // reload the song's src before playing
    this.isLoaded = false;
    this.play();
  }

  prev() {
    this.index--;
    if (this.index < 0) this.index = this.songs.length - 1;

    // reload the song's src before playing
    this.isLoaded = false;
    this.play();
  }

  loop(value: boolean) {
    this.player.loop = value;
  }

  shuffle(value: boolean) {
    if (value) {
      this.songs.sort(() => Math.random() - 0.5);
    }
  }

  created() {
    this.load();
  }
}
</script>

<style scoped lang="scss">
.player-container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #161616;
}

.cover {
  flex-grow: 1;
}

.time-stamp {
  font-family: sans-serif;
  color: #d8d8d8;
}

.slider {
  display: flex;
  width: 100%;
  padding-left: 0.25em;
  padding-right: 0.25em;

  input[type="range"] {
    margin: auto 0.5em;

    -webkit-appearance: none;
    position: relative;
    overflow: hidden;
    height: 10px;
    cursor: pointer;
    border: none;
    outline: none;
    flex-grow: 1;
  }

  ::-webkit-slider-runnable-track {
    background: #ddd;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 5px;
    height: 10px;
    background: #000;
    box-shadow: -100vw 0 0 100vw dodgerblue;
  }

  ::-moz-range-track {
    height: 10px;
    background: #ddd;
  }

  ::-moz-range-thumb {
    background: #fff;
    height: 40px;
    width: 20px;
    border: 3px solid #999;
    border-radius: 0 !important;
    box-shadow: -100vw 0 0 100vw dodgerblue;
    box-sizing: border-box;
  }
}
</style>
