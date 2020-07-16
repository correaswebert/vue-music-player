<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
    />

    <MusicPlayer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MusicPlayer from "./pages/MusicPlayer.vue";

@Component({
  components: {
    MusicPlayer,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
