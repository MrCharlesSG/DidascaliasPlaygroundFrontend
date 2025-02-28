<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-xl font-medium mb-2">Access a session</h3>
    <label for="session" class="block text-lg font-medium mb-2">Session:</label>
    <input type="text" name="session" id="session" v-model="session" class="w-1/2 p-2 border border-gray-300 rounded-md mb-4"/>
    <input type="button" value="Access" v-on:click="accessSession()" :disabled="sessionRequest" class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 w-1/2">
  </div>
   
</template>

<script>
export default {
  name: 'SessionAccess',

  data() {
    return {
      session: '',
      sessionRequest: false,
      notFound: false,
    }
  },

  methods: {
    accessSession() {
      console.log('Accessing session: ' + this.session);

      // TODO: Session format validation

      // Make async call
      if (!this.request) {
        this.sessionRequest = true;
                
        console.log("Sending session request...");
        fetch("http:/badUri/api/session/" + this.session)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.message) {
            console.log('Session found!');
            this.$router.push('/session/' + this.session);
            this.notFound = false;
          } else {
            console.log('Session not found!');
            // this.notFound = true;
            alert('Session not found!');
          }
          this.sessionRequest = false;
        }).catch(err => {
          console.log(err)
          this.sessionRequest = false;
          alert('Session not found!');
        });
      }
    },
  }
}
</script>

<style scoped>
  .errorMSG {
    text-align: center;
  }
</style>
