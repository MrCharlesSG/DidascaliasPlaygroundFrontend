<template>
  <div id="sidebar" v-if="display" class="bg-slate-700 overflow-x-hidden pt-5 text-center z-50 px-3 flex flex-col fixed inset-0 md:relative md:inset-auto">
    <div class="showHideSidebar">
      <img src="@/assets/icons/black_menu.png" id="menu" v-if="shouldDisplay" @click="$emit('alterSidebar')" class="w-12 h-12 pt-1 cursor-pointer invert">
    </div>
    <h3 class="text-white text-4xl mb-5 mt-0 font-sans font-semibold">Mission Control</h3>
    <UniversitiesLogos :type="'sidebar'"/>

    <br class="between"> <br class="between"> 
    <div id="groups" class="flex flex-col space-y-4 flex-1">
      <router-link to="/dashboard" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <p class="inline-block text-white text-2xl">🎛  Dashboard</p> <br>
      </router-link>

      <router-link to="/dashboard/groups" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <p class="inline-block text-white text-2xl">👥  Groups</p> <br>
      </router-link>

      <router-link to="/dashboard/config" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <p class="inline-block text-white text-2xl">⚙️  Config</p> <br>
      </router-link>

      <router-link to="/dashboard/profile" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <p class="inline-block text-white text-2xl">👤  Profile</p> <br>
      </router-link>

      <router-link to="/dashboard/analytics" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <p class="inline-block text-white text-2xl">📊 Analytics</p> <br>
      </router-link>
    </div>

    <div id="sidebarBottom" class="text-center text-xl mb-2">
      <p class="m-0 mb-2 text-gray-300">© 2023 Mission Control</p>
      <p class="m-0 mb-2 text-gray-300">Version: 0.1.0</p>
    </div>
  </div>
</template>

<script>
  import UniversitiesLogos from '@/components/little_components/UniversitiesLogos.vue';

  export default {
    name: 'SideBar',
    props: ['shouldDisplay'],
    emits: ['alterSidebar', 'clickedOnLink'],

    components: {
      UniversitiesLogos,
    },

    computed: {
      display() {
        return (this.shouldDisplay == undefined) ? true : this.shouldDisplay;
      }
    },
  }
</script>

<style scoped>
  @media (min-width: 860px) {
    #sidebar .showHideSidebar {
      display: none;
    }
  }

  @media (max-width: 860px) {
    #sidebar .between br {
      display: none;
    }
  }

</style>