<template>
  <h3 class="text-xl font-medium mb-2">Access a session</h3>
    <label for="session" class="block text-lg font-medium mb-2">Session:</label>
    <input type="text" name="session" id="session" v-model="session" class="w-1/2 p-2 border border-gray-300 rounded-md mb-4"/>
    <p class="errorMSG text-red-500 text-center mb-4" v-if="notFound">The session doesn't exist!</p>
    <input type="button" value="Access" v-on:click="accessSession()" :disabled="sessionRequest" class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 w-1/2">
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
            this.notFound = true;
          }
          this.sessionRequest = false;
        }).catch(err => {
          console.log(err)
          this.sessionRequest = false;
          this.notFound = true;
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
