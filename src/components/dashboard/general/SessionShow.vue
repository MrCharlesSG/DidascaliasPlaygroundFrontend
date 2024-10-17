<template>
  <div class="mySession">
    <h2 style="text-align: start;">My sessions:</h2>

    <div id="mySessionFlex">
      <div class="box1" id="mySessionFlexItem">
        <h3>Box1</h3>
      </div>
      <div class="box2" id="mySessionFlexItem">
        <h3>Box2</h3>
      </div>
      <div class="box3" id="mySessionFlexItem">
        <h3>Access current streaming</h3>
        <button v-on:click="this.sentToReceiver()">CLICK HERE [beta]</button>
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
        this.apiCall('https://cyclops.uab.cat/api/getSessionShow')
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
  .mySession {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 50px;
    text-align: center;
  }

  #mySessionFlex {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  #mySessionFlexItem {
    min-width: 180px;
    width: 30%;
    height: 200px;
    background-color: whitesmoke;
    border: 1px solid gray;
    padding: 5px;
  }

  @media (max-width: 600px) {
    #mySessionFlexItem {
      width: 100%;
      height: 150px;
    }
  }
</style>
