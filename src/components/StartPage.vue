<template>
  <div id="startPage">
    <h1>Mision Control</h1>
    <!--Double image at the same row-->
    <UniversitiesLogos/>

    <br> <!-- TODO: Make session login a new component -->
    <SessionAccess/>
    <br> <br>
    <form action="" @submit.prevent>
      <label for="email" class="label">Email:</label> <br>
      <input type="email" class="inputBox" name="email" id="email" placeholder="email" v-model="email"/>
      <br> <br>
      <label for="password" class="label">Password:</label> <br>
      <input type="password" class="inputBox" name="password" id="password" placeholder="password" v-model="password"/>
      <p class="errorMSG" v-if="loginError">User or password incorrect!</p>
      <br v-if="!loginError"> <br v-if="!loginError">
      <input type="button" value="Log-in" style="margin-right:15px" v-on:click="logIn()" :disabled="userRequest">
      <input type="button" value="Register">
    </form>
  </div>
</template>

<script>
  import { useUserStore } from '@/store/useUserStore.js';
  import { mapActions } from 'pinia';
  import SessionAccess from '@/components/little_components/SessionAccess.vue';
  import router from '@/router';
  import UniversitiesLogos from '@/components/little_components/UniversitiesLogos.vue';

  export default {
    name: 'StartPage',

    components: {
      SessionAccess,
      UniversitiesLogos,
    },

    data() {
      return {
        email: '',
        password: '',
        userRequest: false,
        loginError: false,
      }
    },

    methods: {
      // Store function import
      ...mapActions(useUserStore, { loginOnStore: 'login', checkIfSuperUser: 'isSuperUser' } ),
      
      logIn() {
        // TODO: Make sure format is correct (avoid SQL injection)

        // Make async call
        if (!this.userRequest) {
          this.userRequest = true;

          console.log("Sending login request...");

          fetch("http:/badUri/api/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          }).then(res => res.json())
          .then(data => {
            if (data.success) {
              this.loginError = false;
              this.userRequest = false;

              // Call store func
              this.loginOnStore(this.email, data.name);
              this.checkIfSuperUser().then(superUser => {
                superUser ? router.push('/instances') : router.push('/dashboard');
              });
            } else {
              this.userRequest = false;
              this.loginError = true;
            }
            console.log(data.message);
          }).catch(err => {
            // TODO: Handle error
            this.loginError = true;
            console.log(err);
            this.userRequest = false;
          });
        }
      }
    }
  }
</script>
  
<style scoped>
  
  .inputBox {
    width: 50%;
  }

  #startPage {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .errorMSG {
    background-color: #ff5c00;
    color: lightcyan;
    margin-left: 37%;
    margin-right: 37%;
    border-radius: 10px;
  }

  .label {
    font-size: 18px;
  }

  ::placeholder {
    text-align: center;
  }

</style>
  