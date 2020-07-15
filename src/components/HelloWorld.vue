<template>
  <div>
    <span id="my-text">{{ myText }}</span>
    <button @click="startInterval" id="start-interval">start</button>
  </div>
</template>

<script>
export default {
  name: "Interval",
  data() {
    return {
      myText: 0,
    };
  },
  methods: {
    startInterval: function() {
      console.log("starting");
      setInterval(function() {
        console.log("starting");
        this.myText++;
      }, 1000);
    },
  },
};
</script>
