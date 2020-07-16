<template>
  <div class="controls">
    <NueButton @btn-press="shuffle" icon="fa-random"></NueButton>
    <NueButton @btn-press="$emit('prev')" icon="fa-chevron-left"></NueButton>

    <!-- if isPlaying is true, then show user the 'pause' controls -->
    <NueButton v-if="!gIsPlaying" @btn-press="$emit('play')" icon="fa-play"></NueButton>
    <NueButton v-else @btn-press="$emit('pause')" icon="fa-pause"></NueButton>

    <NueButton @btn-press="$emit('next')" icon="fa-chevron-right"></NueButton>
    <NueButton @btn-press="loop" icon="fa-undo"></NueButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NueButton from "./NueButton.vue";

@Component({
  components: {
    NueButton,
  },
})
export default class Controls extends Vue {
  @Prop(Boolean) private isPlaying!: boolean;

  looped = false;
  shuffled = false;

  public get gIsPlaying(): boolean {
    return this.isPlaying;
  }

  loop() {
    this.looped = !this.looped;
    this.$emit("loop", this.looped);
  }
  shuffle() {
    this.shuffled = !this.shuffled;
    this.$emit("shuffle", this.shuffled);
  }
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  flex: row;
}
</style>
