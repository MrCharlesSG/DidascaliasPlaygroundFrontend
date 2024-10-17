<template>
  <div id="secondNav">
    <div class="groupsManagement"> <p @click="goToGroups()">Group Management</p> </div>
    <div class="usersManagement"> <p @click="goToUsers()">User Management</p> </div>
  </div>
</template>

<script>
  export default {
    name: 'TopNav',
    
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
  #secondNav {
    display: flex;
    flex-direction: row;
    align-content: center;
    margin-left: 30px;
  }

  #secondNav .groupsManagement {
    border-radius: 10px 0px 0px 10px;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    text-decoration: v-bind("groupsManagement ? 'underline' : 'none'");
  }

  #secondNav .usersManagement {
    border-radius: 0px 10px 10px 0px;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    text-decoration: v-bind("usersManagement ? 'underline' : 'none'");
  }

  #secondNav .usersManagement p, #secondNav .groupsManagement p {
    cursor: pointer;
    margin-bottom: 0;
  }
</style>