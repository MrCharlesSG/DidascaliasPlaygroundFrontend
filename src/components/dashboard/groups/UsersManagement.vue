<template>
  <h2 class="usersTitle">Students  | {{ studentsAmount }}</h2>
  <div id="searchDiv">
    <p class="lupa">🔍</p>
    <input type="text" name="searchBar" id="searchBar" v-model="search"
    placeholder="Search"/>
  </div> 

  <br>
  <table>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Groups</th>
    </tr>
    <tr v-for="student in filteredStudents" :key="student.email">
      <td>{{ student.name }}</td>
      <td>{{ student.email }}</td>
      <td>{{ student.role }}</td>
      <td>{{ student.groups }}</td>
    </tr>
  </table>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/store/useUserStore';

export default {
  name: 'UsersManagement',

  data() {
    return {
      search: "",
      students: [
          {
            "name": "Loading...",
            "email": "",
            "role": "",
            "groups": ""
          }
      ],
    }
  },

  methods: {
    ...mapActions(useUserStore, { logoutOnStore: 'logout' } ),
    ...mapActions(useUserStore, ['apiCall', 'errorToken']),
  },

  computed: {
    studentsAmount() {
      return this.students.length;
    },

    filteredStudents() {
      return this.students.filter(student => {
        return student.name.toLowerCase().includes(this.search.toLowerCase())
        || student.email.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },

  mounted() {
    // Get students from DB TODO: change to real DB
    // TODO: Handle empty response (Nonify)

    this.apiCall('https://cyclops.uab.cat/api/getStudents')
    .then(data => {
      this.students = data.students;
    })
    .catch(error => {
      this.errorToken(error);
      this.students = [ 
        {
          "name": "Error loading the data",
          "email": "",
          "role": "",
          "groups": ""
        } 
      ];
    });
  }
}
</script>

<style scoped>
.usersTitle {
  margin-left: 20px;
}

#searchDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 50px;
  margin-bottom: 20px;
}

#searchBar {
  margin-left: 40px;
  margin-bottom: 20px;
  width: 40%;
  min-width: 275px;
  height: 30px;
  border-radius: 15px;
  margin: 0;
  margin-left: 15px;
}

.lupa {
  font-size: 20px;
  margin: 0;
  margin-left: 5px;
}

table {
  margin-left: 50px;
  border-collapse: collapse;
  width: 90%;
  min-width: 275px;
  text-align: left;
}

th,td {
  padding: 8px;
}

tr:nth-of-type(1) {   /* 1st row */
  border-bottom: 2px solid #000;
}

td { /* All columns */
  text-transform: capitalize;
}

td:nth-child(2) {  /* 2nd col (Email) */
  text-transform: lowercase;
}

@media (max-width: 510px) {
  table {
    margin-left: 0;
    width: 95%;
    margin: auto;
  }

  td {
    font-size: 14px;
  }
}
</style>