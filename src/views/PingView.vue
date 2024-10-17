<template>
    <img alt="UAB logo" src="../assets/logos/UAB.png" class="logo">
    <br> <br> <br>
    <Ping/>
    <RouterLink to="/">Home</RouterLink>
  </template>
  
  <script>
  import Ping from '@/components/Ping.vue';
  
  export default {
    name: 'App',
    components: {
      Ping
    }
  }
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .logo {
    height: 100px;
    width: auto;
  }
  </style>
  