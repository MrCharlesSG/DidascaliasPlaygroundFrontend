<template>
  <div class="min-h-screen bg-slate-100 p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row mb-8">
        <div class="flex-grow mb-8 md:mb-0">
          <h1 class="text-3xl font-bold text-slate-800 mb-4">Sesiones de Usuario</h1>
        </div>
        <div class="flex-shrink-0 flex items-center justify-center md:justify-end">
          <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
            <img src="/placeholder.svg?height=80&width=80" alt="Avatar de usuario" class="w-20 h-20 rounded-full mr-4" />
            <div>
              <h2 class="text-xl font-semibold text-slate-800">Juan Pérez</h2>
              <p class="text-slate-600">juan.perez@ejemplo.com</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div v-for="(group, date) in groupedSessions" :key="date" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-slate-200 px-6 py-4">
            <h3 class="text-lg font-semibold text-slate-800">{{ formatDate(date) }}</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="session in group" 
                :key="session.id" 
                class="bg-slate-50 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md cursor-pointer"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-lg font-semibold text-slate-800">Sesión #{{ session.id }}</span>
                  <span class="text-sm font-medium text-slate-600">Grupo {{ session.groupNumber }}</span>
                </div>
                <div class="flex items-center mb-2">
                  <ClockIcon class="w-5 h-5 text-slate-500 mr-2" />
                  <span class="text-slate-700">{{ session.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarIcon, ClockIcon } from 'lucide-vue-next'

const sessions = ref([
  { id: 1, date: '2023-05-15', duration: '1h 30min', groupNumber: 3 },
  { id: 2, date: '2023-05-15', duration: '45min', groupNumber: 2 },
  { id: 9, date: '2023-05-15', duration: '1h 30min', groupNumber: 3 },
  { id: 10, date: '2023-05-15', duration: '45min', groupNumber: 2 },
   { id: 11, date: '2023-05-15', duration: '1h 30min', groupNumber: 3 },
  { id: 12, date: '2023-05-15', duration: '45min', groupNumber: 2 },
  { id: 3, date: '2023-05-20', duration: '2h', groupNumber: 1 },
  { id: 4, date: '2023-05-20', duration: '1h', groupNumber: 3 },
  { id: 5, date: '2023-05-25', duration: '1h 15min', groupNumber: 2 },
  { id: 6, date: '2023-05-25', duration: '30min', groupNumber: 1 },
  { id: 7, date: '2023-05-28', duration: '1h 45min', groupNumber: 3 },
  { id: 8, date: '2023-05-28', duration: '50min', groupNumber: 2 },
])

const groupedSessions = computed(() => {
  const groups = {}
  sessions.value.forEach(session => {
    if (!groups[session.date]) {
      groups[session.date] = []
    }
    groups[session.date].push(session)
  })
  return groups
})

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}
</script>