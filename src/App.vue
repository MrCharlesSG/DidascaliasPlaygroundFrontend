<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<script>
export default {
  name: 'App',
  components: {
    RouterView
  },
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
  }
</style>