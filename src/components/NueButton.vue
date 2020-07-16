<template>
  <button @click="$emit('btn-press')" class="cta">
    <i :class="['fa', icon]"></i>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NeuButton extends Vue {
  @Prop(String) private icon!: string;
}
</script>

<style scoped lang="scss">
$mainC: #39454e;
$secC: #9dabc0;

%center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cta {
  @extend %center;

  width: 5em;
  height: 5em;
  background: $mainC;

  margin: 1em;

  color: #86a5cc;

  border: none;
  /* border: 1px solid #fff; */
  border-radius: 50%;
  outline: none;

  &:active {
    box-shadow: inset 7px 7px 15px rgba(0, 0, 0, 0.15), inset -7px -7px 20px #080808,
      0px 0px 4px rgba(0, 0, 0, 0.2);
  }
  transition: box-shadow 100ms ease-out;
}
</style>
