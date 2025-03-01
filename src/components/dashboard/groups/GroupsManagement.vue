<template>
  <div class="flex justify-center items-center h-full p-4">
    <div>
      <h2 class="text-2xl font-semibold mb-4 text-center sm:text-left">Groups | {{ groupsAmount }}</h2>
      <div class="flex flex-wrap gap-4 justify-center">
        <GroupLittle v-for="item in groups" :key="item.name"
          :groupInfo="item"/>
      </div>
    </div>
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

    this.apiCall('https://cyclops-dev.uab.cat/api/getGroups')
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
/* Tailwind CSS classes applied directly in the template */
</style>