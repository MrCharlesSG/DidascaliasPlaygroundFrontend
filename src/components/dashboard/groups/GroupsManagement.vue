<template>
  <h2 class="groupsTitle">Groups  | {{ groupsAmount }}</h2>
  <div id="groups">
    <GroupLittle v-for="item in groups" :key="item.name"
      :groupInfo="item"/>
  </div>
</template>

<script>
import GroupLittle from '@/components/dashboard/groups/GroupLittle.vue';
import { mapActions } from 'pinia';
import { useUserStore } from '@/store/useUserStore';

export default {
  name: 'GroupsManagement',

  components: {
    GroupLittle,
  }, 

  data() {
    return {
      groups: [
        {
          name: "Loading...",
          tutorName: "",
          tutorEmail: "",
          course: "",
          year: ""
        }
      ]
    }
  },

  mounted() {
    // Get groups from DB TODO: change to real DB
    // TODO: Handle empty response (Nonify)

    this.apiCall('https://cyclops.uab.cat/api/getGroups')
    .then(data => {
      this.groups = data.groups; 
    })
    .catch(err => {
      console.log(err);
      this.groups = [ 
        {
          name: "Error loading the data",
          tutorName: "error",
          tutorEmail: "error",
          course: "error",
          year: "error"
        } 
      ];
    })
  },

  methods: {
    ...mapActions(useUserStore, ['apiCall']),
  },

  computed: {
    groupsAmount() {
      return this.groups.length;
    }
  }
}
</script>

<style scoped>
#groups {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 20px;
  margin-top: 30px;
  gap: 20px;
}

.groupsTitle {
  margin-left: 20px;
}


</style>