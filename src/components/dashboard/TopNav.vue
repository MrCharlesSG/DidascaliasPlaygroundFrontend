<template>
  <div id="topNav">
    <div class="showHideSidebar" id="topNavItem">
      <img src="@/assets/icons/black_menu.png" alt="menu" id="menu"
        @click="alterSidebar()">
    </div>
    <div class="title" id="topNavItem"> <h1>{{ title }}</h1> </div>
    <div class="language" id="topNavItem">
      <select>
        <option value="en">English</option>
        <option value="es">Castellano</option>
        <option value="ca">Català</option>
      </select>
    </div>
    <div class="parentDropdown" id="topNavItem" 
      @mouseover="isDropdown = true"  @mouseleave="isDropdown = false">
      <div class="avatar">
        <img src="@/assets/avatars/default.jpeg" alt="avatar" class="avatar"/>
        <!-- put it on the right of the image-->
        <p class="username">{{ nameFromStore }} ⬇️</p>
      </div>

      <div class="avatarDropdown" v-if="isDropdown">
        <p class="clickable" v-on:click="goToProfile()">Profile</p>
        <!-- TODO: Log-out -->
        <!-- TODO: Make it prettier -->
        <p class="clickable" @click="logOut()">Log-out</p>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router';
  import { mapActions, mapState } from 'pinia';
  import { useUserStore } from '@/store/useUserStore';

  export default {
    name: 'TopNav',
    
    props: ['title'],
    emits: ['alterSidebar'],

    data() {
      return {
        isDropdown: false,
      }
    },

    methods: {
      goToProfile() {
        this.isDropdown = false;
        router.push('/dashboard/profile');
      },

      dropdown() {
        this.isDropdown = !this.isDropdown;
        console.log(this.isDropdown);
      },

      alterSidebar() {
        this.$emit('alterSidebar');
      },

      // Store function import
      ...mapActions(useUserStore, { logoutOnStore: 'logout' } ),

      logOut() {
        this.logoutOnStore();
        router.push('/');
      }
    },

    computed: {
      // Store state import
      ...mapState(useUserStore, { nameFromStore: 'name' }),
    }
  }
</script>

<style scoped>
  #topNav {
    background-color: #f5f5f5;
    border-bottom: 1px solid #e3e3e3;
    
    padding: 15px;
    padding-left: 30px;
    padding-right: 100px;
    margin-bottom: 0;
    margin-top: 0px;

    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #topNav h1 {
    margin: 0;
    font-size: 1.5em;
    font-weight: 400;
    color: #666;
  }

  #topNav .showHideSidebar {
    display: none;
  }

  #topNav .title {
    flex-grow: 3;
  }

  #topNav .language {
    flex-grow: 1;
    text-align: right;
  }

  #topNav .avatar {
    flex-grow: 1;
    text-align: right;

    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    /* TODO: Fix clickbox: it's bigger than expected */
    cursor: pointer;
  }

  #topNav .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-self: end;
  }

  #topNav .avatar p {
    margin: 0;
    margin-left: 10px;
    justify-self: start;
  }

  #topNav .parentDropdown {
    position: relative;
  }

  #topNav .avatarDropdown {
    position: absolute;
    top: 99%;
    right: 0;
    width: 150px;
    height: 100px;
    
    padding: 15px;

    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    z-index: 1;

    text-align: center;
    font-size: 20px;
    padding-top: 20px;
  }

  #topNav .avatarDropdown p {
    margin: 0;
    margin-bottom: 25px;
  }

  #menu {
    width: 30px;
    height: 30px;
    padding-top: 3px;
    cursor: pointer;
  }

  .clickable {
    cursor: pointer;
  }

  @media (max-width: 960px) {
    #topNav .showHideSidebar {
      display: block;
      flex-grow: 2;
    }
  }

  @media (max-width: 600px) {
    #topNav .username {
      display: none;
    }

    #topNav {
      padding: 15px 20px 15px 20px;
      justify-content: space-evenly;
      align-items: center;
    }

    #topNav #topNavItem {
      margin-left: 10px;
    }

  }

</style>
