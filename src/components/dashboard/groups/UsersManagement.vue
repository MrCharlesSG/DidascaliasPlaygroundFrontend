<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4 text-center sm:text-left">Students | {{ studentsAmount }}</h2>
    <div class="flex items-center mb-4">
      <p class="text-xl">🔍</p>
      <input type="text" name="searchBar" id="searchBar" v-model="search"
      placeholder="Search" class="ml-4 p-2 border rounded w-full max-w-md"/>
    </div> 

    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th class="border-b-2 p-2 text-left">Name</th>
          <th class="border-b-2 p-2 text-left">Email</th>
          <th class="border-b-2 p-2 text-left">Role</th>
          <th class="border-b-2 p-2 text-left">Groups</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.email">
          <td class="p-2">{{ student.name }}</td>
          <td class="p-2 lowercase">{{ student.email }}</td>
          <td class="p-2 capitalize">{{ student.role }}</td>
          <td class="p-2">{{ student.groups }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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

    this.apiCall('https://cyclops-dev.uab.cat/api/getStudents')
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
/* Tailwind CSS classes applied directly in the template */
</style>