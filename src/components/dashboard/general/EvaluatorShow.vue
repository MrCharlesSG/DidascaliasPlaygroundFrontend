<template>
  <div class="evaluator">
    <h2 style="text-align: start;">Evaluator:</h2>

    <div id="evaluatorFlex">

      <div class="box1" id="evaluatorFlexItem" @click="goToGroups()">
        <h3>Groups</h3>
        <p class="bigNumber"> {{ groupsAmount }} </p>
      </div>

      <div class="box2" id="evaluatorFlexItem" @click="goToUsers()">
        <h3>Students</h3>
        <p class="bigNumber"> {{ studentsAmount }} </p>
      </div>

      <div class="box3" id="evaluatorFlexItem">
        <h3>Access a session</h3>
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
        this.apiCall('https://cyclops.uab.cat/api/getDashboard')
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
  .evaluator {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 50px;
    text-align: center;
  }

  #evaluatorFlex {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  #evaluatorFlexItem {
    min-width: 180px;
    width: 30%;
    height: 200px;
    background-color: whitesmoke;
    border: 1px solid gray;
    padding: 5px;
  }

  .box1, .box2 {
    cursor: pointer;
  }

  .box3 {
    /* Center vertically the content*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bigNumber {
    font-size: 50px;
  }

  @media (max-width: 600px) {
    #evaluatorFlexItem {
      width: 100%;
      height: 150px;
    }
  }
</style>
