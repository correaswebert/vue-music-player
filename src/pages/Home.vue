<template>
  <div class="container">
    <NueButton />
    <NueButton />
    <NueButton />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NueButton from "../components/NueButton.vue";

@Component({
  components: {
    NueButton,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100vw;
  height: 100vh;
  @extend %center;
}
</style>
