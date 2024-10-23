<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Estadísticas de Movimiento</h1>

      <div v-if="loading" class="text-center py-8">
        <LoaderIcon class="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p class="mt-2 text-gray-600">Cargando datos...</p>
      </div>

      <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>

      <div v-else>
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Gráfico de Movimiento</h2>
          <canvas ref="chartRef"></canvas>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Información</h2>
            <p><strong>Fecha de inicio:</strong> {{ formatDate(data.session[0].start_date) }}</p>
            <p><strong>Fecha de fin:</strong> {{ formatDate(data.session[0].end_date) }}</p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Eventos</h2>
            <ul class="space-y-2">
              <li v-for="event in data.events" :key="event.id" class="flex items-center">
                <span 
                  class="w-3 h-3 rounded-full mr-2" 
                  :class="getEventColor(event.type)"
                ></span>
                <span class="font-medium">{{ event.type }}</span>
                <span class="ml-2 text-gray-600">{{ formatTime(event.momento) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { LoaderIcon } from 'lucide-vue-next'
import Chart from 'chart.js/auto'
import stats from '/src/api/stats.json'

const chartRef = ref(null)
const data = ref(null)
const loading = ref(true)
const error = ref(null)
let chart = null

const fetchData = async () => {
  try {

    data.value = stats;
  } catch (e) {
    error.value = "Error al cargar los datos. Por favor, intente de nuevo más tarde."
  } finally {
    loading.value = false
  }
}

const createChart = () => {
  if (chart) {
    chart.destroy()
  }

  const ctx = chartRef.value.getContext('2d')
  const datasets = ['MOV_HAND_LEFT', 'MOV_HAND_RIGHT', 'MOV_HEAD'].map(name => ({
    label: name,
    data: data.value.stats.filter(stat => stat.nombre === name).map(stat => stat.valor),
    borderColor: getColor(name),
    tension: 0.1
  }))

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.value.stats.filter(stat => stat.nombre === 'MOV_HAND_LEFT').map(stat => formatTime(stat.momento)),
      datasets
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getColor = (name) => {
  switch (name) {
    case 'MOV_HAND_LEFT':
      return 'rgb(75, 192, 192)'
    case 'MOV_HAND_RIGHT':
      return 'rgb(255, 99, 132)'
    case 'MOV_HEAD':
      return 'rgb(54, 162, 235)'
    default:
      return 'rgb(201, 203, 207)'
  }
}

const getEventColor = (type) => {
  switch (type) {
    case 'TALK':
      return 'bg-green-500'
    case 'INSULT':
      return 'bg-red-500'
    case 'STAND_UP':
      return 'bg-yellow-500'
    default:
      return 'bg-gray-500'
  }
}



onMounted(async () => {
  await fetchData();
  await nextTick(); // Espera a que el DOM esté completamente actualizado
  createChart();
});

watch(data, async () => {
  if (data.value) {
    await nextTick(); // Asegúrate de que el DOM esté completamente actualizado antes de crear el gráfico
    createChart();
  }
});
</script>