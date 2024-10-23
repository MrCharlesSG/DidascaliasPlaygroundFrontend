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
              <p><strong>Fecha de inicio:</strong> {{ formatDate(data.info.start_date) }}</p>
              <p><strong>Fecha de fin:</strong> {{ formatDate(data.info.end_date) }}</p>
            </div>
  
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Eventos</h2>
              <ul class="space-y-2">
                <li v-for="event in data.events" :key="event.momento" class="flex items-center">
                  <span 
                    class="w-3 h-3 rounded-full mr-2" 
                    :class="event.type === 'TALK' ? 'bg-green-500' : 'bg-red-500'"
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
  import { ref, onMounted, watch } from 'vue'
  import { LoaderIcon } from 'lucide-vue-next'
  import Chart from 'chart.js/auto'
  
  const chartRef = ref(null)
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)
  let chart = null
  
  const fetchData = async () => {
    try {
      // Simular una llamada a la API
      const response = await new Promise(resolve => setTimeout(() => resolve({
        stats: [
          { nombre: "MOV_HAND_LEFT", momento: "2023-10-12T08:00:00.000Z", valor: 4.9 },
          { nombre: "MOV_HAND_LEFT", momento: "2023-10-12T08:00:30.000Z", valor: 1.1 },
          { nombre: "MOV_HAND_LEFT", momento: "2023-10-12T08:01:00.000Z", valor: 2.5 },
          { nombre: "MOV_HAND_LEFT", momento: "2023-10-12T08:01:30.000Z", valor: 3.7 },
        ],
        info: {
          start_date: "2023-10-12T08:00:00.000Z",
          end_date: "2023-10-12T08:20:00.000Z"
        },
        events: [
          { type: "TALK", momento: "2023-10-12T08:10:00.000Z" },
          { type: "INSULT", momento: "2023-10-12T08:12:45.000Z" }
        ]
      }), 1000))
      data.value = response
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
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.value.stats.map(stat => formatTime(stat.momento)),
        datasets: [{
          label: 'MOV_HAND_LEFT',
          data: data.value.stats.map(stat => stat.valor),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
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
  
  onMounted(() => {
    fetchData()
  })
  
  watch(data, () => {
    if (data.value) {
      createChart()
    }
  })
  </script>