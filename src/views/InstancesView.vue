<template>
  <div id="main">

  </div>
  <h1>INSTANCES</h1>
  <h2 class="alertMSG">ALERT: You are on a only-admin page.</h2>
  <h3 class="alertMSG">If you are not an administrator, please email to test@test.test</h3>

  <div id="instances">
    <div v-for="instance in instances" :key="instance.name" class="card">
      <h3>{{ instance.name }}</h3>
      <p><b>University:</b> {{ instance.university }}</p>
      <p><b>Date:</b> {{ instance.date }}</p>
      <p><b>Time:</b> {{ instance.time }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/store/useUserStore';

export default {
  name: 'InstancesView',

  data() {
    return {
      instances: [
        {
          name: 'Loading...',
          university: 'Loading...',
          date: '00/00/0000',
          time: '00:00',
        },
      ]
    }
  },

  methods: {
    ...mapActions(useUserStore, ['apiCall']),

    getInstances() {
      this.apiCall('https://cyclops-dev.uab.cat/api/getInstances')
      .then(res => {
        this.instances = res.data;
      }).catch(error => console.log(error));
    }
  },

  mounted() {
    this.getInstances();
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

h1, h2, h3 {
  text-align: center;
}

.alertMSG{
  color: red;
  margin: 0;
}

/* I want 3 cards per row*/
#instances {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 50px;
}

.card {
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 2%;
  width: 25%;
  margin-bottom: 2%;
  min-width: 200px;
}

.card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
}

</style>
