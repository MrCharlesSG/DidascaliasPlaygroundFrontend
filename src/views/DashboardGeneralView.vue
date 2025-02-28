<template>
  <div class="flex flex-col md:flex-row h-screen relative">
    <SideBar :shouldDisplay="masterShowSidebar" @alterSidebar="alterSidebar()" @clickedOnLink="alterSidebarOnClick()" :class="{'hidden': !masterShowSidebar, 'md:w-1/5 lg:w-1/6': masterShowSidebar}"/>
    <div id="noSidebar" :class="{'w-full': !masterShowSidebar, 'md:w-4/5 lg:w-5/6': masterShowSidebar}" class="flex-grow overflow-y-auto">
      <TopNav :title="this.$route.meta.window.charAt(0).toUpperCase() + this.$route.meta.window.slice(1)" @alterSidebar="alterSidebar()"/>
      <router-view/>
    </div>
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
  @media (max-width: 860px) {
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
    margin: 0;
  }
</style>