<template>
  <div class="min-h-screen bg-slate-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-slate-800 mb-8">Estadísticas de Movimiento</h1>

      <div v-if="loading" class="text-center py-8">
        <LoaderIcon class="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p class="mt-2 text-slate-600">Cargando datos...</p>
      </div>

      <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>

      <div v-else>
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">Gráfico de Movimiento</h2>
          <canvas ref="chartRef" v-if="data"></canvas> <!-- Agregar v-if aquí -->
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-slate-800 mb-4">Información</h2>
            <p><strong>Fecha de inicio:</strong> {{ formatDate(data.session[0].start_date) }}</p>
            <p><strong>Fecha de fin:</strong> {{ formatDate(data.session[0].end_date) }}</p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-slate-800 mb-4">Eventos</h2>
            <ul class="space-y-2">
              <li v-for="event in data.events" :key="event.id" class="flex items-center">
                <span 
                  class="w-3 h-3 rounded-full mr-2" 
                  :class="getEventColor(event.type)"
                ></span>
                <span class="font-medium">{{ event.type }}</span>
                <span class="ml-2 text-slate-600">{{ formatTime(event.momento) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router'; // Importar useRoute para acceder a los parámetros de la ruta
import { LoaderIcon } from 'lucide-vue-next';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import axios from 'axios';

Chart.register(annotationPlugin);

const chartRef = ref(null);
const data = ref(null);
const loading = ref(true);
const error = ref(null);
let chart = null;

const route = useRoute(); // Obtener la ruta actual

// Función para extraer el último segmento de la URI
const extractSessionIdFromUrl = () => {
  const segments = route.path.split('/');
  return segments[segments.length - 1]; // Obtener el último segmento (ID de la sesión)
};

const sessionId = extractSessionIdFromUrl(); // Obtener el ID de la sesión

// Función para obtener datos del servidor
const fetchData = async () => {
  loading.value = true; // Activar indicador de carga
  try {
    const response = await axios.get(`http://localhost:3000/session/info/${sessionId}`); // Usar sessionId en la llamada a la API
    data.value = response.data; // Asignar datos de la respuesta
  } catch (e) {
    error.value = "Error al cargar los datos. Por favor, intente de nuevo más tarde.";
  } finally {
    loading.value = false; // Desactivar indicador de carga
  }
};

const createChart = () => {
  if (chart) {
    chart.destroy();
  }

  const ctx = chartRef.value.getContext('2d'); // Aquí puede fallar si chartRef.value es null

  const datasets = ['MOV_HAND_LEFT', 'MOV_HAND_RIGHT', 'MOV_HEAD'].map(name => ({
    label: name,
    data: data.value.stats.filter(stat => stat.nombre === name).map(stat => stat.valor),
    borderColor: getColor(name),
    tension: 0.1
  }));

  const annotations = data.value.events.map(event => ({
    type: 'line',
    scaleID: 'x',
    value: formatTime(event.momento),
    borderColor: getEventColor(event.type),
    borderWidth: 2,
    label: {
      content: event.type,
      enabled: true,
      position: 'start',
      backgroundColor: getEventColor(event.type),
    }
  }));

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
      },
      plugins: {
        annotation: {
          annotations: annotations
        }
      }
    }
  });
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getColor = (name) => {
  switch (name) {
    case 'MOV_HAND_LEFT':
      return 'rgb(75, 192, 192)';
    case 'MOV_HAND_RIGHT':
      return 'rgb(255, 99, 132)';
    case 'MOV_HEAD':
      return 'rgb(54, 162, 235)';
    default:
      return 'rgb(201, 203, 207)';
  }
};

const getEventColor = (type) => {
  switch (type) {
    case 'TALK':
      return 'bg-green-500';
    case 'INSULT':
      return 'bg-red-500';
    case 'STAND_UP':
      return 'bg-yellow-500';
    default:
      return 'bg-slate-500';
  }
};

onMounted(async () => {
  await fetchData();
  await nextTick();
  if (data.value) { // Asegurarse de que los datos están disponibles antes de crear el gráfico
    createChart();
  }
});

watch(data, async () => {
  if (data.value) {
    await nextTick();
    createChart();
  }
});
</script>
