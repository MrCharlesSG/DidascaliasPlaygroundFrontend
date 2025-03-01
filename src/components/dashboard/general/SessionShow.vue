<template>
  <div class="mySession mt-5 mx-2 mb-12 text-center">
    <h2 class="text-left text-2xl font-semibold mb-4">My sessions:</h2>

    <div id="mySessionFlex" class="flex flex-wrap justify-center items-center gap-8">
      <div class="cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md w-full md:w-1/4 mb-3 h-48">
        <h3 class="text-xl font-medium mb-2">Box1</h3>
      </div>
      <div class="cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md w-full md:w-1/4 mb-3 h-48">
        <h3 class="text-xl font-medium mb-2">Box2</h3>
      </div>
      <div class="cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md w-full md:w-1/4 mb-3 flex flex-col justify-center items-center h-48">
        <h3 class="text-xl font-medium mb-2">Access current streaming</h3>
        <button v-on:click="this.sentToReceiver()" class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 mt-4">CLICK HERE [beta]</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'pinia';
  import { useUserStore } from '@/store/useUserStore';

  export default {
    name: 'SessionShow',

    data() {
      return {
        /* TODO: Declare data */
      }
    },

    methods: {
      ...mapActions(useUserStore, ['apiCall']),

      updateStats() {
        this.apiCall('https://cyclops-dev.uab.cat/api/getSessionShow')
        .then(data => {
          data;
          /* TODO: Set data */
        })
        .catch(error => console.log(error));
      },

      sentToReceiver() {
        this.$router.push('/receiver/index.html');

        setTimeout(() => {
          window.location.reload(); // Force reload after 1 second
        }, 500); // Adjust the timeout as needed
      }
    },

    mounted() {
      this.updateStats();
    }
  }
</script>

<style scoped>
  .bigNumber {
    font-size: 50px;
  }
</style>
