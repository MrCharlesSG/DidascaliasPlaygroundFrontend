<template>
  <div class="evaluator mt-5 mx-2 mb-12 text-center">
    <h2 class="text-left text-2xl font-semibold mb-4">Evaluator:</h2>

    <div id="evaluatorFlex" class="flex flex-wrap justify-center items-center gap-8">
      <div class="cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md w-full md:w-1/4 mb-3 h-48" @click="goToGroups()">
        <h3 class="text-xl font-medium mb-2">Groups</h3>
        <p class="bigNumber text-5xl font-bold"> {{ groupsAmount }} </p>
      </div>

      <div class="cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md w-full md:w-1/4 mb-3 h-48" @click="goToUsers()">
        <h3 class="text-xl font-medium mb-2">Students</h3>
        <p class="bigNumber text-5xl font-bold"> {{ studentsAmount }} </p>
      </div>

      <div class="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md w-full md:w-1/4 mb-3 h-48 flex flex-col justify-center items-center">
        <SessionAccess/>
      </div>
    </div>
  </div>
</template>

<script>

  import SessionAccess from '@/components/little_components/SessionAccess.vue';
import { useUserStore } from '@/store/useUserStore';
  import { mapActions } from 'pinia';

  export default {
    name: 'EvaluatorShow',

    components: {
       SessionAccess,
    }, 

    data() {
      return {
        groupsAmount: "...",
        studentsAmount: "..."
      }
    },

    methods: {
      ...mapActions(useUserStore, ['apiCall']),

      logIn() {
        return;
      },

      goToGroups() {
        this.$router.push('/dashboard/groups');
      },
      goToUsers() {
        this.$router.push('/dashboard/users');
      },

      updateStats() {
        this.apiCall('http:/badUri/api/getDashboard')
        .then(data => {
          this.groupsAmount = data.groupAmount;
          this.studentsAmount = data.studentAmount;
        })
        .catch(error => console.log(error));
      }
    },

    mounted() {
      this.updateStats();
    },
  }
</script>

<style scoped>
  .bigNumber {
    font-size: 50px;
  }
</style>
