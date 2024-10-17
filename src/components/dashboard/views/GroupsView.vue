<template>
  <SecondNav :groupsManagement="showGroups"/>
  <GroupsManagement v-if="showGroups"/>
  <UsersManagement v-else/>
</template>
  
<script>
  import SecondNav from '@/components/dashboard/groups/SecondNav.vue';
  import GroupsManagement from '@/components/dashboard/groups/GroupsManagement.vue';
  import UsersManagement from '@/components/dashboard/groups/UsersManagement.vue';

  export default {
    name: 'GroupsView',

    components: {
      SecondNav,
      GroupsManagement,
      UsersManagement,
    },

    data() {
      return {
        showGroups: true,
      }
    },

    methods: {

    },

    // Handle device screen size change
    created() {
      if (this.$route.meta.window == "groups") {
        this.showGroups = true;
      } else if (this.$route.meta.window == "users") {
        this.showGroups = false;
      }
    },

    // Handle route change
    updated() {
      // Access meta router var
      if (this.$route.meta.window == "groups") {
        this.showGroups = true;
      } else if (this.$route.meta.window == "users") {
        this.showGroups = false;
      }
    },
  }
</script>
