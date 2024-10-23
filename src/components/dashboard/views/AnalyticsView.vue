<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row mb-8">
          <div class="flex-grow mb-8 md:mb-0">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Sesiones de Usuario</h1>
          </div>
          <div class="flex-shrink-0 flex items-center justify-center md:justify-end">
            <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
              <img src="/placeholder.svg?height=80&width=80" alt="Avatar de usuario" class="w-20 h-20 rounded-full mr-4" />
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Juan Pérez</h2>
                <p class="text-gray-600">juan.perez@ejemplo.com</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="session in sessions" 
            :key="session.id" 
            class="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold text-gray-800">Sesión #{{ session.id }}</span>
              <span class="text-sm font-medium text-gray-600">Grupo {{ session.groupNumber }}</span>
            </div>
            <div class="flex items-center mb-2">
              <CalendarIcon class="w-5 h-5 text-gray-500 mr-2" />
              <span class="text-gray-700">{{ session.date }}</span>
            </div>
            <div class="flex items-center mb-2">
              <ClockIcon class="w-5 h-5 text-gray-500 mr-2" />
              <span class="text-gray-700">{{ session.duration }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { CalendarIcon, ClockIcon } from 'lucide-vue-next'
  
  const sessions = ref([
    { id: 1, date: '2023-05-15', duration: '1h 30min', groupNumber: 3 },
    { id: 2, date: '2023-05-18', duration: '45min', groupNumber: 2 },
    { id: 3, date: '2023-05-20', duration: '2h', groupNumber: 1 },
    { id: 4, date: '2023-05-22', duration: '1h', groupNumber: 3 },
    { id: 5, date: '2023-05-25', duration: '1h 15min', groupNumber: 2 },
    { id: 6, date: '2023-05-28', duration: '30min', groupNumber: 1 },
  ])
  </script>