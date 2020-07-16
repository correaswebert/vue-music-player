<template>
  <div class="player-container">
    <SongCover
      class="cover"
      :albumArtUrl="url"
      :title="current.title"
      :artist="current.artist"
    />

    <div class="slider">
      <!-- currentTime takes time to load, so show 0:00 instead of --:-- -->
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

    <!-- <TimeSlider
      :duration="duration"
      :currentTime="currentTime"
      @update-current-time="updateCurrentTime"
    /> -->

    <!-- <div class="controls">
      <NueButton @btn-press="prev" icon="fa-random"></NueButton>
      <NueButton @btn-press="prev" icon="fa-chevron-left"></NueButton>

      <NueButton v-if="!isPlaying" @btn-press="play" icon="fa-play"></NueButton>
      <NueButton v-else @btn-press="pause" icon="fa-pause"></NueButton>

      <NueButton @btn-press="next" icon="fa-chevron-right"></NueButton>
      <NueButton @btn-press="next" icon="fa-undo"></NueButton>
    </div> -->
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
import NueButton from "../components/NueButton.vue";
import SongCover from "../components/SongCover.vue";
import Controls from "../components/Controls.vue";
// import TimeSlider from "../components/TimeSlider.vue";

interface Song {
  title: string;
  artist: string;
  src: string;
}

@Component({
  components: {
    NueButton,
    // TimeSlider,
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
  // url = "https://unsplash.com/photos/YeUVDKZWSZ4";
  url = "http://ecx.images-amazon.com/images/I/51XSHShbPiL.jpg";

  isPlaying = false;
  isLoaded = false;

  player = new Audio();

  songs: Song[] = [
    {
      title: "Photograph",
      artist: "Ed Sheeran",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Ed_Sheeran-Photograph.mp3"),
    },
    {
      title: "Not Today",
      artist: "Imagine Dragons",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Imagine_Dragons-Not_Today.mp3"),
    },
    {
      title: "Khuda Jaane",
      artist: "Kay Kay",
      src: require("/home/swebert/Documents/WebProjects/side-projects/music-player/src/assets/Music/Khuda_Jaane.mp3"),
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
    // console.log("play");

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
    // console.log("pause");

    this.isPlaying = false;
    clearInterval(this.intervalId);
    this.player.pause();
  }

  next() {
    // console.log("next");

    this.index++;
    if (this.index > this.songs.length - 1) this.index = 0;

    // reload the song's src before playing
    this.isLoaded = false;
    this.play();
  }

  prev() {
    // console.log("prev");

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
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}

%background {
  background-color: #6e1712;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(224,960,506)'%3E%3Cstop offset='0' stop-color='%236e1712'/%3E%3Cstop offset='1' stop-color='%23156685'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='453' height='377.5' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.07'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

.player-container {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #161616;
}

.controls {
  display: flex;
  flex: row;
}

.slider {
  display: flex;
  width: 100vw;
  padding-left: 0.25em;
  padding-right: 0.25em;
}

.time-stamp {
  font-family: sans-serif;
  color: #d8d8d8;
}

.cover {
  flex-grow: 1;
}

.slider input[type="range"] {
  margin: auto 0.5em;
  /* margin-left: 0.25em;
  margin-right: 0.25em; */

  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  height: 10px;
  cursor: pointer;
  border: none;
  outline: none;
  flex-grow: 1;
}

.slider ::-webkit-slider-runnable-track {
  background: #ddd;
}

.slider ::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 5px;
  height: 10px;
  background: #000;
  box-shadow: -100vw 0 0 100vw dodgerblue;
}

.slider ::-moz-range-track {
  height: 10px;
  background: #ddd;
}

.slider ::-moz-range-thumb {
  background: #fff;
  height: 40px;
  width: 20px;
  border: 3px solid #999;
  border-radius: 0 !important;
  box-shadow: -100vw 0 0 100vw dodgerblue;
  box-sizing: border-box;
}
</style>
