// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto si tu servidor está en otro lugar
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
