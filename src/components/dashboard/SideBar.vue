<template>
  <div id="sidebar" v-if="display">
    <div class="showHideSidebar">
      <img src="@/assets/icons/black_menu.png" id="menu" v-if="shouldDisplay"
        @click="$emit('alterSidebar')">
    </div>
    <h3>Mission Control</h3>
    <UniversitiesLogos :type="'sidebar'"/>

    <br class="between"> <br class="between"> 
    <div id="groups">
      <router-link to="/dashboard" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <!--<img src="../assets/dashboard.png" alt="dashboard" id="dashboard">-->
        <p>🎛  Dashboard</p> <br>
      </router-link>

      <router-link to="/dashboard/groups" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <!--<img src="../assets/dashboard.png" alt="dashboard" id="dashboard">-->
        <p>👥  Groups</p> <br>
      </router-link>

      <router-link to="/dashboard/config" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <!--<img src="../assets/dashboard.png" alt="dashboard" id="dashboard">-->
        <p>⚙️  Config</p> <br>
      </router-link>

      <router-link to="/dashboard/profile" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <!--<img src="../assets/dashboard.png" alt="dashboard" id="dashboard">-->
        <p>👤  Profile</p> <br>
      </router-link>

      <router-link to="/dashboard/analytics" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <!--<img src="../assets/dashboard.png" alt="dashboard" id="dashboard">-->
        <p>📊 Analytics</p> <br>
      </router-link>

      <router-link to="/dashboard/sessions/1" class="btn btn-primary" @click="$emit('clickedOnLink')">
        <!--<img src="../assets/dashboard.png" alt="dashboard" id="dashboard">-->
        <p>📊 Stats</p> <br>
      </router-link>
    </div>
    
    <div id="sidebarBottom">
      <p>© 2023 Mission Control</p>
      <p>Version:  0.1.0</p>
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

  #sidebar {
    background-color: #2c3e50;
    width: 330px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 20px;
    text-align: center;
    z-index: 1;
  }

  #sidebar h3 {
    color: #fff;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 2.25em;
    margin-bottom: 20px;
    margin-top: 0;
  }

  #sidebar p {
    color: #fff;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5em;
    margin-bottom: 0;
  }

  #sidebarBottom {
    position: absolute;
    bottom: 20px;
    width: 100%;
    font-size: 13px;
    margin: 0;
  }

  #sidebarBottom p {
    margin: 0;
    margin-bottom: 10px;
    color: lightgray;
  }

  #menu {
    width: 50px;
    height: 50px;
    padding-top: 3px;
    cursor: pointer;
    filter: invert(1);
  }

  .btn-primary p {
    display: inline-block;
  }

  @media (min-width: 960px) {
    #sidebar .showHideSidebar {
      display: none;
    }
  }

  @media (max-width: 960px) {
    #sidebar .between br {
      display: none;
    }
  }

  @media (max-height: 685px) {
    #sidebarBottom p {
      font-size: 10px;
    }
  }

  @media (max-height: 600px) {
    #sidebarBottom {
      display: none;
    }
  }

</style>