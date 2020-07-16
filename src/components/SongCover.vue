<template>
  <div
    class="album-art"
    :style="{ backgroundImage: `url(${gUrl})` }"
    crossorigin="anonymous"
  >
    <!-- <img :src="gUrl" alt="Album cover" @error="setFallbackImageUrl" class="album-art" /> -->
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
  @Prop(String) private albumArtUrl!: string;
  @Prop(String) private title!: string;
  @Prop(String) private artist!: string;

  get gTitle(): string {
    return this.title;
  }
  get gArtist(): string {
    return this.artist;
  }
  get gUrl(): string {
    return this.albumArtUrl;
  }

  setFallbackImageUrl() {
    this.albumArtUrl = require("../assets/Images/placeholder.jpeg");
  }
}
</script>

<style lang="scss" scoped>
.album-art {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  /* max-width: 100vw; */
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
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
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
