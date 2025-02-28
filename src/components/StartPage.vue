<template>
  <div id="startPage" class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-5">
    <h1 class="text-4xl font-bold mb-8">Mission Control</h1>
    <UniversitiesLogos class="mb-8"/>


    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md mb-8 flex flex-col justify-center items-center">
      <SessionAccess/>
    </div>
    
    <form action="" @submit.prevent class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="email" class="block text-lg font-medium mb-2">Email:</label>
        <input type="email" class="inputBox w-full p-2 border border-gray-300 rounded-md" name="email" id="email" placeholder="email" v-model="email"/>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-lg font-medium mb-2">Password:</label>
        <input type="password" class="inputBox w-full p-2 border border-gray-300 rounded-md" name="password" id="password" placeholder="password" v-model="password"/>
      </div>
      <p class="errorMSG text-red-500 text-center mb-4" v-if="loginError">User or password incorrect!</p>
      <div class="flex justify-between items-center">
        <input type="button" value="Log-in" class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600" v-on:click="logIn()" :disabled="userRequest">
        <input type="button" value="Register" class="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600">
      </div>
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
  .errorMSG {
    text-align: center;
  }

</style>
