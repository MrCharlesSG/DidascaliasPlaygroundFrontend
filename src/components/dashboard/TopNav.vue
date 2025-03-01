<template>
  <div id="topNav" class="bg-gray-100 border-b border-gray-300 p-4 flex items-center justify-between">
    <div class="showHideSidebar md:block">
      <img src="@/assets/icons/black_menu.png" alt="menu" id="menu" @click="alterSidebar()" class="w-8 h-8 pt-1 cursor-pointer hidden">
    </div>
    <div class="title flex-grow px-2 pt-1">
      <h1 class="m-0 text-2xl font-normal text-gray-500">{{ title }}</h1>
    </div>
    <div class="flex items-center space-x-4">
      <div class="language">
        <select class="border border-gray-300 rounded p-1">
          <option value="en">English</option>
          <option value="es">Castellano</option>
          <option value="ca">Català</option>
        </select>
      </div>
      <div class="parentDropdown relative" @mouseover="isDropdown = true" @mouseleave="isDropdown = false">
        <div class="avatar flex items-center cursor-pointer me-5">
          <img src="@/assets/avatars/default.jpeg" alt="avatar" class="w-10 h-10 rounded-full">
          <p class="ml-2">{{ nameFromStore }} ⬇️</p>
        </div>
        <div class="absolute top-full right-0 w-36 bg-white border border-gray-300 rounded shadow-lg z-10 text-center" v-if="isDropdown">
          <p class="clickable cursor-pointer hover:bg-gray-100 py-2 px-4 rounded" @click="goToProfile()">Profile</p>
          <p class="clickable cursor-pointer hover:bg-gray-100 py-2 px-4 rounded" @click="logOut()">Log-out</p>
        </div>
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
      ...mapActions(useUserStore, { logoutOnStore: 'logout' }),

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
  @media (max-width: 860px) {
    .showHideSidebar img {
      display: block;
    }
  }

  @media (max-width: 600px) {
    .username {
      display: none;
    }

    #topNav {
      padding: 15px 20px;
      justify-content: space-evenly;
      align-items: center;
    }

    #topNavItem {
      margin-left: 10px;
    }
  }
</style>