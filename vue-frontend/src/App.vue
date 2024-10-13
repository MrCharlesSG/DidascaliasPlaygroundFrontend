<template>
  <div>
    <h1>Usuarios</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>

    <h1>Estadísticas de la Sesión</h1>
    <button @click="fetchSessionStats">Obtener estadísticas de la sesión</button>
    <ul>
      <li v-for="stat in sessionStats" :key="stat.id">{{ stat.nombre }}: {{ stat.valor }}</li>
    </ul>
  </div>
</template>

<script>
import apiClient from './api/api'; // Asegúrate de que la ruta sea correcta

export default {
  data() {
    return {
      users: [],
      sessionStats: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiClient.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchSessionStats() {
      console.log("session stats")
      const id_user = 1; // Cambia esto según el usuario que quieras buscar
      const id_session = 1; // Cambia esto según la sesión que quieras buscar
      const stat_type = 'MOV_HEAD'; // Cambia esto según el tipo de estadística que quieras buscar

      try {
        const response = await apiClient.get('/stats/session', {
          params: { id_user, id_session, stat_type }
        });
        this.sessionStats = response.data;
      } catch (error) {
        console.error('Error fetching session stats:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers(); // Obtener usuarios cuando se monta el componente
    this.fetchSessionStats();
  }
};
</script>

<style scoped>
/* Estilos aquí */
</style>
