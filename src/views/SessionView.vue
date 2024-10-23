<template>
  <div id="session">
    <div id="topBar">
      <input type="button" value="Back" @click="$router.push('/')">
      <span>ID: {{ $route.params.sessionId }}</span>
    </div>

    <div class="dashboard">
      <ClassMap id="classMap" class="flexItem" 
        :students="sessionInfo.students" @clickedEmit="updateClicked"/>
      <AvatarStats id="avatarStats" class="flexItem" :show="(this.selected != -1)" 
        :avatar="sessionInfo.students[selectedStudentNoNegative]"/>
    </div>
    <div class="dashboard">
      <GlobalStats id="globalStats" :sessionID="$route.params.sessionId" class="flexItem"/>
      <EventsCall class="flexItem"/>
    </div>
  </div>
</template>

<script>
  import ClassMap from '@/components/session/ClassMap.vue';
  import AvatarStats from '@/components/session/AvatarStats.vue';
  import GlobalStats from '@/components/session/GlobalStats.vue';
  import EventsCall from '@/components/session/EventsCall.vue';

  export default {
    name: 'MissionControlView',

    components: {
    ClassMap,
    AvatarStats,
    GlobalStats,
    EventsCall,
    },

    data () {
      return {
        intervalId: null,

        // Avoid showing any stat until a student is selected
        selected: -1,

        sessionInfo: {
          students: [
          {
            name: 'Carla',
            coords: [230, 125],
            id: 0,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          },
          {
            name: 'John',
            coords: [260, 100],
            id: 1,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          },
          {
            name: 'Sally',
            coords: [230, 75],
            id: 2,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          },
          {
            name: 'Bob',
            coords: [200, 50],
            id: 3,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          },
          {
            name: 'Teacher',
            coords: [75, 100],
            id: 4,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          },
          {
            name: 'End',
            coords: [400, 100],
            id: 5,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          },
          {
            name: 'Over',
            coords: [200, 0],
            id: 6,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          },
          {
            name: 'Down',
            coords: [0, 200],
            id: 7,
            stats: {
              attention: [0],
              learning: [0],
              life: [0],
            },
          }
        ],
        }
      }
    },

    methods: {
      updateClicked(id) {
        if (id == null || id == undefined) {
          this.selected = 0;
        }
        this.selected = id % this.sessionInfo.students.length;
      },

      getStudentPositions() {
        console.log("Getting student positions with id " + this.$route.params.sessionId);
        fetch("http:/badUri/api/session/" + this.$route.params.sessionId + "/startWS")
        .then(response => response.json())
        .then(retrievedData => {
          if (retrievedData.data == null || retrievedData.data == undefined) {
            this.sessionInfo.students = [];
            throw("This session doesn't have students or session doesn't exist");
          }

          this.sessionInfo.students = [];
          retrievedData.data.alumnosPosiciones.forEach((student, index) => {

            this.sessionInfo.students.push({
              name: student.nombre,
              coords: [student.posicion.x * 100, student.posicion.y * 100],
              id: index,
              stats: {
                attention: [0],
                learning: [0],
                life: [0],
              },
            });

          });
        })
        .catch(error => console.error(error));
      },
    },

    computed: {
      selectedStudentNoNegative() {
        if (this.selected < 0) {
          return 0;
        }
        return this.selected;
      }
    },

    mounted() {
      this.intervalId = setInterval(() => {
        this.sessionInfo.students.forEach(student => {
          student.stats.attention.push(Math.floor(Math.random() * 100));
          student.stats.learning.push(Math.floor(Math.random() * 100));
          student.stats.life.push(Math.floor(Math.random() * 100));
        })}, 2000);
      this.getStudentPositions();
    },

    beforeUnmount() {
      clearInterval(this.intervalId);
    },
  }
</script>

<style scoped>

  #session {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #topBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    background-color: #333;
    color: #fff;
  }

  #topBar input {
    background-color: #333;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 5px 20px;
    cursor: pointer;
  }

  #topBar input:hover {
    background-color: #fff;
    color: #333;
  }

  .dashboard {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /*padding: 20px;*/
  }

  .flexItem {
    min-width: 400px;
    max-width: 50%;
    min-height: 350px;
    max-height: 40%;

    border: 1px solid #333;
    box-sizing: border-box;

    text-align: center;
    width: 100%;
    height: 100%;

    /*border-radius: 11px;*/
  }

  /*With mobile phone size */
  @media (max-width: 768px) {
    .dashboard {
      flex-direction: column;
    }

    .flexItem {
      min-width: 100%;
      max-width: 100%;
      min-height: 350px;
      max-height: 40%;
    }
  }


</style>