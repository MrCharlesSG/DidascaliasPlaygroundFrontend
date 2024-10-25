<template>
  <div class="min-h-screen bg-slate-50 p-8">
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
              <router-link 
                v-for="session in group" 
                :key="session.id" 
                :to="{ name: 'SessionStatsPage', params: { sessionId: session.id } }"  
                class="bg-slate-50 rounded-lg p-4 transition duration-300 ease-in-out transform hover:shadow-md cursor-pointer group"
              >
                <div class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                      <input 
                          type="checkbox" 
                          :id="`session-${session.id}`" 
                          v-model="selectedSessions" 
                          :value="session"
                          :disabled="selectedSessions.length >= 3 && !selectedSessions.includes(session)"
                          :class="{
                              'opacity-0 group-hover:opacity-100': !selectedSessions.includes(session),
                              'opacity-100': selectedSessions.includes(session)
                          }"
                          @click.stop
                          class="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 mr-2"
                          aria-label="Seleccionar sesión #{{ session.id }}"
                          />
                    <label :for="`session-${session.id}`" class="text-lg font-semibold text-slate-800">
                      Sesión #{{ session.id }}
                    </label>
                  </div>
                </div>
                <div class="flex items-center mb-2">
                  <ClockIcon class="w-5 h-5 text-slate-500 mr-2" />
                  <span class="text-slate-700">Duración: {{ formatDuration(session.start_date, session.end_date) }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-slate-700">Inicio: {{ formatTime(session.start_date) }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-slate-700">Fin: {{ formatTime(session.end_date) }}</span>
                </div>
              </router-link>  
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
          <div class="relative">
            <button 
              @click="navigateToMultiSessionView"
              :disabled="selectedSessions.length < 2"
              class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Navegar a nueva vista"
            >
              <ArrowRightIcon class="w-4 h-4" />
            </button>
            <div v-if="selectedSessions.length < 2" class="absolute bottom-full mb-2 right-0 w-48 bg-slate-800 text-white text-xs rounded p-2 shadow-lg">
              Selecciona al menos 2 sesiones para comparar
              <div class="absolute bottom-0 right-2 transform translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800"></div>
            </div>
          </div>
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
          <span class="text-slate-700">Sesión #{{ session.id }} ({{ formatDuration(session.start_date, session.end_date) }})</span>
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
import { ref, computed, onMounted, watch } from 'vue'
import { ClockIcon, XIcon, ChevronUpIcon, ChevronDownIcon, ArrowRightIcon } from 'lucide-vue-next'
import axios from 'axios'
import { useRouter } from 'vue-router'

const sessions = ref([])
const selectedSessions = ref([])
const isMinimized = ref(false)
const router = useRouter()

const groupedSessions = computed(() => {
  const groups = {}
  sessions.value.forEach(session => {
    const sessionDate = new Date(session.start_date).toISOString().split('T')[0] // Formato YY-MM-DD
    if (!groups[sessionDate]) {
      groups[sessionDate] = []
    }
    groups[sessionDate].push(session)
  })
  return groups
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0] // Retorna la fecha en formato YY-MM-DD
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

const formatDuration = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const durationMs = endDate - startDate
  const minutes = Math.floor((durationMs / 1000 / 60) % 60)
  const hours = Math.floor(durationMs / 1000 / 60 / 60)

  return `${hours}h ${minutes}min`
}

const removeSelectedSession = (session) => {
  selectedSessions.value = selectedSessions.value.filter(s => s.id !== session.id)
}

const navigateToMultiSessionView = () => {
  if (selectedSessions.value.length >= 2) {
    const sessionIds = selectedSessions.value.map(s => s.id).join(',')
    router.push({ name: 'MultiSessionStatsPage', params: { sessionIds: sessionIds } })
  }
}

const fetchSessions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/sessions')
    sessions.value = response.data
  } catch (error) {
    console.error('Error al cargar sesiones:', error)
  }
}

onMounted(() => {
  fetchSessions()
})

watch(selectedSessions, (newValue) => {
  if (newValue.length > 3) {
    selectedSessions.value = newValue.slice(0, 3)
  }
})
</script>

<style scoped>
.group:hover input[type="checkbox"] {
  opacity: 1;
}
</style>