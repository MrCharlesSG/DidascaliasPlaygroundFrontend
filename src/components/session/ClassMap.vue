```
It will show as a classroom map with the following features:
- Show the classroom map
- Show the classroom map with the number of students in each seat and the name of the students
- Show the teacher's position
- Each person can be clicked to show the information of that person
```

<template>
  <div id="classMap" ref="classMap">
    <h1>Class Map</h1>
    
    <div v-if="studentsExist">
      <div class="student" v-for="student in students" v-bind:key="student.id"
        @click="$emit('clickedEmit', student.id)" 
        :style="{left: (student.coords[0] * this.classMapSize[0] / 400) + 'px', 
          top: (student.coords[1] * this.classMapSize[1] / 200) + 35 + 'px'}">
        <div class="student-name">{{ student.name }}</div>
      </div>
    </div>

    <h2 v-if="!studentsExist" style="margin-top: 120px;">There are no avatars in this session</h2>
  </div>
</template>

<script>
  export default {
    name: 'ClassMap',
    props: ['students'],
    emits: ['clickedEmit'],

    data() {
      return {
        classMapSize: [0, 0],
        // Coords relative to 400x200
      }
    },

    methods: {
      onScreenChange() {
        this.classMapSize[0] = this.$refs.classMap.offsetWidth - 50;
        this.classMapSize[1] = this.$refs.classMap.offsetHeight - 75;
      }
    },

    computed: {
      studentsExist() {
        return this.students != null && this.students != undefined && this.students.length > 0;
      },
    },

    mounted() {
      this.$nextTick(() => {
        this.onScreenChange();
      });
    },

    created() {
      window.addEventListener("resize", this.onScreenChange); 
    },
    unmounted() {
      window.removeEventListener("resize", this.onScreenChange);
    },
  }
</script>

<style scoped>
  #classMap {
    background-color: lightgreen;
    position: relative;
  }

  #classMap h1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    color: #505050;
    z-index: 0;
  }

  .student {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    cursor: pointer;
  }

  .student-name {
    color: black;
    font-size: 12px;
  }


  
</style>
