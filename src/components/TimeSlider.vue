<template>
  <div>
    {{ g_currentTime }}

    <input
      type="range"
      v-model="currentTime"
      :max="duration"
      @change="$emit('update-current-time')"
    />

    {{ g_duration }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TimeSlider extends Vue {
  @Prop(Number) private duration!: number;
  @Prop(Number) private currentTime!: number;

  get g_duration(): number {
    return this.duration;
  }
  get g_currentTime(): number {
    return this.currentTime;
  }
}
</script>

<style lang="scss" scoped>
input[type="range"] {
  margin: auto;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  height: 10px;
  width: 750px;
  cursor: pointer;
  border: none;
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
</style>
