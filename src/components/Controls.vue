<template>
  <div class="controls">
    <button @click="shuffle" :style="{ color: shuffled ? '#7fffd4' : '#999' }">
      <i class="fa fa-random" />
    </button>

    <div class="main-controls">
      <button @click="$emit('prev')"><i class="fa fa-chevron-left main" /></button>

      <!-- if isPlaying is true, then show user the 'pause' controls -->
      <NueButton v-if="!gIsPlaying" @btn-press="$emit('play')" icon="fa-play"></NueButton>
      <NueButton v-else @btn-press="$emit('pause')" icon="fa-pause"></NueButton>

      <button @click="$emit('next')"><i class="fa fa-chevron-right main" /></button>
    </div>

    <button @click="loop" :style="{ color: looped ? '#7fffd4' : '#999' }">
      <i class="fa fa-undo" />
    </button>
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
  width: 100%;
  max-width: 586px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.main-controls {
  display: inline-flex;
  justify-content: space-between;
  color: #86a5cc;
}

button {
  background: none;
  border: none;
  outline: none;
  color: aquamarine;

  i.main {
    color: #86a5cc;
    margin: 0 1em;
  }
}
</style>
