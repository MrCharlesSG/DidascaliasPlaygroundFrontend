<template>
  <div class="min-h-screen bg-slate-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-semibold text-slate-700 mb-2">
      Sesión #{{ route.params.sessionId }}
      </h1>
      <h2 class="text-3xl font-bold text-slate-800 mb-8">
        Estadísticas de Movimiento
      </h2>

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
          <apexchart
            type="line"
            height="400"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div v-for="(sessionData, index) in sessionsData" :key="index" class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-slate-800 mb-4">
              Información 
            </h2>
            <p><strong>Fecha de inicio:</strong> {{ formatDate(sessionData.session[0].start_date) }}</p>
            <p><strong>Fecha de fin:</strong> {{ formatDate(sessionData.session[0].end_date) }}</p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-slate-800 mb-4">Eventos</h2>
            <ul class="space-y-2">
              <li v-for="event in allEvents" :key="event.id" class="flex items-center">
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
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { LoaderIcon } from 'lucide-vue-next';
import axios from 'axios';

const sessionsData = ref([]);
const loading = ref(true);
const error = ref(null);

const route = useRoute();

const isMultiSession = computed(() => route.name === 'MultiSessionStatsPage');

const sessionIds = computed(() => {
  if (isMultiSession.value) {
    return route.params.sessionIds.split(',');
  } else {
    return [route.params.sessionId];
  }
});

const fetchData = async () => {
  loading.value = true;
  try {
    const promises = sessionIds.value.map(id => 
      axios.get(`http://localhost:3000/session/info/${id}`)
    );
    const responses = await Promise.all(promises);
    sessionsData.value = responses.map(response => response.data);
  } catch (e) {
    error.value = "Error al cargar los datos. Por favor, intente de nuevo más tarde.";
  } finally {
    loading.value = false;
  }
};

const series = computed(() => {
  if (!sessionsData.value.length) return [];
  
  return sessionsData.value.flatMap((sessionData) => 
    ['MOV_HAND_LEFT', 'MOV_HAND_RIGHT', 'MOV_HEAD'].map(name => ({
      name: isMultiSession.value ? `${name} (Sesión #${sessionData.session[0].id})` : name,
      data: sessionData.stats
        .filter(stat => stat.nombre === name)
        .map(stat => ({
          x: new Date(stat.momento).getTime(),
          y: stat.valor
        }))
    }))
  );
});

const allEvents = computed(() => {
  return sessionsData.value.flatMap(sessionData => 
    sessionData.events.map(event => ({
      ...event,
      sessionId: sessionData.session[0].id
    }))
  ).sort((a, b) => new Date(a.momento) - new Date(b.momento));
});

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 400,
    animations: {
      enabled: false
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false
    }
  },
  yaxis: {
    title: {
      text: 'Valor'
    }
  },
  colors: ['#4bc0c0', '#ff6384', '#36a2eb', '#ffcd56', '#9966ff', '#ff9f40', '#c9cbcf', '#8a2be2', '#7fff00'],
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 0
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy HH:mm'
    }
  },
  annotations: {
    xaxis: allEvents.value.map(event => ({
      x: new Date(event.momento).getTime(),
      borderColor: getEventColorHex(event.type),
      label: {
        borderColor: getEventColorHex(event.type),
        style: {
          color: '#fff',
          background: getEventColorHex(event.type)
        },
        text: event.type
      }
    }))
  }
}));

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

const getEventColorHex = (type) => {
  switch (type) {
    case 'TALK':
      return '#10B981';
    case 'INSULT':
      return '#EF4444';
    case 'STAND_UP':
      return '#F59E0B';
    default:
      return '#64748B';
  }
};

onMounted(fetchData);
</script>