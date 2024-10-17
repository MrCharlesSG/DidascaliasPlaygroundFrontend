<template>
  <div id="eventList">
    <input type="number" name="number" id="number" v-model="eventId">
    <input type="button" value="Action!" @click="sendEvent()">
    <p>JSON que recibirás: { type: "callEvent", id: "{{ eventId }}" }</p>
  </div>
</template>

<script>

  export default {
    name: 'EventsList',

    data() {
      return {
        eventId: '1',
                
      }
    },

    methods: {
      sendEvent() {
        console.log("Sending event " + this.eventId);
        fetch("https://cyclops.uab.cat" + '/api/callEvent/' + this.eventId,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(response => response.json())
        .then(data => { console.log(data) })
        .catch(error => { console.log(error) });
      }
    }
  }

</script>

<style scoped>
</style>
