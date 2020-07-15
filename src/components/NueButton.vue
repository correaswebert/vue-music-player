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
$mainC: #f1f3f6;
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

  border: none;
  /* border: 1px solid #fff; */
  border-radius: 1.5em;
  outline: none;

  box-shadow: inset 0 0 15px rgba(55, 84, 170, 0), inset 0 0 20px rgba(255, 255, 255, 0),
    7px 7px 15px rgba(55, 84, 170, 0.15), -7px -7px 20px rgba(255, 255, 255, 1),
    inset 0px 0px 4px rgba(255, 255, 255, 0.2);
  .icon {
    color: $secC;
    height: 30px;
    width: 30px;
  }

  &:active {
    box-shadow: inset 7px 7px 15px rgba(55, 84, 170, 0.15),
      inset -7px -7px 20px rgba(255, 255, 255, 1), 0px 0px 4px rgba(255, 255, 255, 0.2);
  }
  transition: box-shadow 100ms ease-out;
}
</style>
