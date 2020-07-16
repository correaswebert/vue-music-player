<template>
  <div class="album-art" :style="{ backgroundImage: `url(${background})` }">
    <div class="gradient"></div>

    <div class="info">
      <div class="song-name">{{ gTitle }}</div>
      <div class="artist-name">{{ gArtist }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  @Prop(String) private title!: string;
  @Prop(String) private artist!: string;

  background = require("../assets/Images/placeholder.jpg");

  get gTitle(): string {
    return this.title;
  }
  get gArtist(): string {
    return this.artist;
  }
}
</script>

<style lang="scss" scoped>
.album-art {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.9)
  );
}

.info {
  position: absolute;
  bottom: 1em;
  font-family: "Poppins", sans-serif;
  color: #9dabc0;
  text-align: center;

  .song-name {
    font-size: 2em;
    font-weight: 700;
  }
  .artist-name {
    font-size: 1.5em;
  }
}
</style>
