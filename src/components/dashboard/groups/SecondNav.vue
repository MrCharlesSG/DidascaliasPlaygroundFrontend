<template>
  <div id="secondNav" class="flex flex-row items-center ml-8">
    <button @click="goToGroups()" :class="['groupsManagement', 'px-4 py-2 mx-2 rounded-l-lg', groupsManagement ? 'underline' : '']">
      Group Management
    </button>
    <button @click="goToUsers()" :class="['usersManagement', 'px-4 py-2 mx-2 rounded-r-lg', usersManagement ? 'underline' : '']">
      User Management
    </button>
  </div>
</template>

<script>
  export default {
    name: 'SecondNav',
    
    props: ['groupsManagement'],

    data() {
      return {
        
      }
    },

    methods: {
      goToGroups() {
        this.$router.push('/dashboard/groups');
      },

      goToUsers() {
        this.$router.push('/dashboard/users');
      },
    },

    computed: {
      usersManagement() {
        return !this.groupsManagement;
      },
    }
  }
</script>

<style scoped>
  /* Tailwind CSS classes applied directly in the template */
</style>