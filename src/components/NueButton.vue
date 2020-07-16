<template>
  <button @click="$emit('btn-press')" class="btn">
    <!-- adjust play button for visual appeal -->
    <i :class="['fa', icon, icon === 'fa-play' ? 'adjust' : '']"></i>
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
.btn {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4em;
  height: 4em;
  background: #39454e;

  margin: 1em;

  color: #86a5cc;

  border: none;
  border-radius: 50%;
  outline: none;

  i.adjust {
    margin-left: 3px;
  }

  &:active {
    box-shadow: inset 7px 7px 15px rgba(0, 0, 0, 0.15), inset -7px -7px 20px #080808,
      0px 0px 4px rgba(0, 0, 0, 0.2);
  }
  transition: box-shadow 100ms ease-out;
}
</style>
