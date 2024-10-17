import { defineStore } from 'pinia';
import router from '../router';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    email: localStorage.getItem('email') || null,
    name: localStorage.getItem('name') || null,
  }),
  getters: {
    isLoggedIn(state) {
      console.log("Checking logging " + state.email + " " + state.user);
      return (state.email != null);
    },
  },
  actions: {

    /**
     * Logs in the user, saving the login information.
     * @param {*} email Email of the user
     * @param {*} name Name of the user
     * @throws Error if email or user are null
     * @throws Error if email or user are empty
     * @throws Error if email or user are not strings
    */
    login(email, name) {
      if (email == null || name == null) 
        throw new Error("Email or user are null");

      if (email == "" || name == "") 
        throw new Error("Email or name are empty");

      if (typeof email != "string" || typeof name != "string") 
        throw new Error("Email or name are not strings");

      this.email = email;
      this.name = name;
      localStorage.setItem('email', email); // Save to localStorage
      localStorage.setItem('name', name); // Save to localStorage
    },

    /**
     * Logs out the user, deleting the saved login information.
     */
    logout() {
      this.email = null;
      this.name = null;
      localStorage.removeItem('email'); // Remove from localStorage
      localStorage.removeItem('name'); // Remove from localStorage
    },

    /**
     * Checks if the error is a token error and, if so, logs out and redirects to login page.
     * @param {*} error Error to check
     */
    errorToken(error) {
      let errorString = error.message.toString();
      if (errorString.includes("Token")) {
        console.log("Bad token, removing it");
        this.logout();
      }
      router.push({ name: 'HomePage' });
    },
    async checkToken() {
      fetch("https://cyclops.uab.cat/api/TODO:", {
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success) throw new Error(data.message);
      })
      .catch(error => {
        this.errorToken(error);
      });
    },

    /**
     * Call the API with the authorization token and, if token is invalid, 
     * logs out and redirects to login page.
     * @param {*} url URL to call
     * @param {*} method Method to use (GET, POST, PUT, DELETE). Default is GET.
     * @param {*} body Body to send. Default is null.
     * @returns a promise with the response, data and errors.
     */
    apiCall(url, method, body) {
      return new Promise((resolve, reject) => {

        fetch(url, {
          method: (method) ? method : 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: (body) ? JSON.stringify(body) : null,
          credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
          if (!data.success) throw new Error(data.message);
          resolve(data);
        })
        .catch(error => {
          this.errorToken(error);
          reject(error);
        });
      });
    },

    isSuperUser() {
      return new Promise((resolve, reject) => {

        fetch("https://cyclops.uab.cat/api/isSuperAdmin", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
          if (!data.success) throw new Error(data.message);
          if (data.data == undefined || data.data == null) throw new Error("Response is null");
          resolve(data.data);
        })
        .catch(error => {
          this.errorToken(error);
          reject(error);
        });
      });
    }
  },
});

