<template>
  <div class="min-h-screen bg-slate-100 p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row mb-8">
        <div class="flex-grow mb-8 md:mb-0">
          <h1 class="text-3xl font-bold text-slate-800 mb-4">Sesiones de Usuario</h1>
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
                class="bg-slate-50 rounded-lg p-4 transition duration-300 ease-in-out transform hover:shadow-md cursor-pointer group"
              >
                <div class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                    <input 
                      type="checkbox" 
                      :id="`session-${session.id}`" 
                      v-model="selectedSessions" 
                      :value="session"
                      class="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <label :for="`session-${session.id}`" class="text-lg font-semibold text-slate-800">
                      Sesión #{{ session.id }}
                    </label>
                  </div>
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

    <!-- Recuadro flotante para sesiones seleccionadas -->
    <div 
      v-if="selectedSessions.length > 0"
      class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md w-full transition-all duration-300 ease-in-out"
      :class="{ 'h-12 overflow-hidden': isMinimized }"
    >
      <div class="flex justify-between items-center mb-2">
        <h4 class="text-lg font-semibold text-slate-800">Sesiones Seleccionadas</h4>
        <div class="flex space-x-2">
          <button 
            @click="navigateToNewView"
            class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Navegar a nueva vista"
          >
            <ArrowRightIcon class="w-4 h-4" />
          </button>
          <button 
            @click="isMinimized = !isMinimized"
            class="text-slate-500 hover:text-slate-700 focus:outline-none"
            :aria-label="isMinimized ? 'Expandir recuadro' : 'Minimizar recuadro'"
          >
            <ChevronUpIcon v-if="!isMinimized" class="w-5 h-5" />
            <ChevronDownIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
      <ul class="space-y-2">
        <li v-for="session in selectedSessions" :key="session.id" class="flex justify-between items-center">
          <span class="text-slate-700">Sesión #{{ session.id }} ({{ session.duration }})</span>
          <button 
            @click="removeSelectedSession(session)"
            class="text-red-500 hover:text-red-700 focus:outline-none"
            aria-label="Eliminar sesión seleccionada"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ClockIcon, XIcon, ChevronUpIcon, ChevronDownIcon, ArrowRightIcon } from 'lucide-vue-next'

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

const selectedSessions = ref([])
const isMinimized = ref(false)

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

const removeSelectedSession = (session) => {
  selectedSessions.value = selectedSessions.value.filter(s => s.id !== session.id)
}

const navigateToNewView = () => {
  // Aquí iría la lógica para navegar a la nueva vista
  console.log('Navegando a nueva vista con sesiones:', selectedSessions.value)
}
</script>

<style scoped>
.group:hover input[type="checkbox"] {
  opacity: 1;
}
</style>