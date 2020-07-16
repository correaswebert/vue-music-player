<template>
  <div class="slider">
    <!-- currentTime takes time to load, so show 0:00 instead of --:-- -->
    <span class="time-stamp" v-if="currentTime">{{ formatTime(gCurrentTime) }}</span>
    <span class="time-stamp" v-else-if="duration">0:00</span>
    <span class="time-stamp" v-else>--:--</span>

    <input type="range" :max="duration" @change="emitTimeUpdate" />

    <span class="time-stamp" v-if="duration">{{ formatTime(gDuration) }}</span>
    <span class="time-stamp" v-else>--:--</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TimeSlider extends Vue {
  @Prop(Number) private duration!: number;
  @Prop(Number) private currentTime!: number;

  get gDuration(): number {
    return this.duration;
  }
  get gCurrentTime(): number {
    return this.currentTime;
  }

  formatTime(time: number): string {
    const ss = time % 60;
    const mm = Math.floor(time / 60);
    return `${mm}:${ss > 9 ? ss : "0" + ss}`;
  }

  emitTimeUpdate(event: any) {
    this.$emit("update-current-time", event.target.value);
  }
}
</script>

<style lang="scss" scoped>
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
