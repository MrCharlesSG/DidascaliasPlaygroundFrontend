<template>
  <SideBar :shouldDisplay="masterShowSidebar" @alterSidebar="alterSidebar()" 
    @clickedOnLink="alterSidebarOnClick()"/>
  <div id="noSidebar" v-if="showNoSidebar">
    <TopNav :title="this.$route.meta.window.charAt(0).toUpperCase() + this.$route.meta.window.slice(1)"
      @alterSidebar="alterSidebar()"/>
    <router-view/>
  </div>
</template>
  
<script>
  import SideBar from '@/components/dashboard/SideBar.vue';
  import TopNav from '@/components/dashboard/TopNav.vue';
  

  export default {
    name: 'DashBoard',

    components: {
      SideBar,
      TopNav,
    },

    data() {
      return {
        masterShowSidebar: true,
      }
    },

    methods: {
      alterSidebar() {
        this.masterShowSidebar = !this.masterShowSidebar;
      },

      alterSidebarOnClick() {
        if (innerWidth < 960) {
          this.masterShowSidebar = false;
        }
      },

      // Fix sidebar display when screen size changes
      onScreenChange(e) {
        if (e.target.innerWidth > 960) {
          this.masterShowSidebar = true;
        } else {
          this.masterShowSidebar = false;
        }
      }
    },

    computed: {
      // Check if I have to show the page
      showNoSidebar() {
        return (innerWidth < 960 && this.masterShowSidebar) ? false : true;
      },
    },

    // Handle device screen size change
    created() {
      window.addEventListener("resize", this.onScreenChange); 
    },
    unmounted() {
      window.removeEventListener("resize", this.onScreenChange);
    },
  }
</script>

<style scoped>
  
  #noSidebar {
    margin-left: 330px;
  }

  @media (max-width: 960px) {
    #sidebar {
      height: 100%;
      width: 100%;
    }

    #noSidebar {
      margin-left: 0px;
    }
  }
</style>

<style>
  body {
    margin: 0 0 0 0;
  }
</style>