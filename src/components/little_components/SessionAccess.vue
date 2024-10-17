<template>
    <form action="" @submit.prevent>
      <label for="session" class="label">Session:</label> <br>
      <input type="text" name="session" id="session" v-model="session" />
      <p class="errorMSG" v-if="notFound">The session doesn't exist!</p>
      <br v-if="!notFound"> <br v-if="!notFound">
      <input type="button" value="Access" v-on:click="accessSession()" :disabled="sessionRequest">
    </form>
</template>

<script>
export default {
  data() {
    return {
    name: 'SessionAccess',

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
        fetch("https://cyclops.uab.cat/api/session/" + this.session)
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
