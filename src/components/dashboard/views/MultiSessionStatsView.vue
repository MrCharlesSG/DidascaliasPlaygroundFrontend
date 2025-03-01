<template>
  <div class="min-h-screen bg-slate-100 p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800">
          Estadísticas de Movimiento (Múltiples Sesiones)
        </h1>
        <div class="flex space-x-4">
            <router-link to="/dashboard/analytics" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center text-sm sm:text-base">
            <Undo2 class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Volver a Analytics
            </router-link>
        </div>
      </div>

      <div v-if="loading" class="text-center py-8">
        <LoaderIcon class="w-8 h-8 animate-spin mx-auto text-blue-500" />
        <p class="mt-2 text-slate-600">Cargando datos...</p>
      </div>

      <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>

      <div v-else>
        <div v-for="statistic in allStatistics" :key="statistic" class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-semibold text-slate-800 mb-4">Gráfico: {{ translateStatistic(statistic) }}</h2>
          <apexchart
            type="line"
            height="400"
            :options="chartOptions(statistic)"
            :series="getSeriesForStatistic(statistic)"
          ></apexchart>
        </div>
      </div>

      <!-- Información de sesiones y eventos -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-slate-800 mb-4">Información de las Sesiones</h2>
        <div v-for="session in sessionsData" :key="session.session[0].id" class="mb-6">
          <h3 class="text-xl font-semibold text-slate-700 mb-2">
            Sesión #{{ session.session[0].id }}
          </h3>
          <p><strong>Fecha de inicio:</strong> {{ formatDate(session.session[0].start_date) }}</p>
          <p><strong>Fecha de fin:</strong> {{ formatDate(session.session[0].end_date) }}</p>

          <h4 class="text-lg font-medium text-slate-800 mt-4 mb-2">Eventos:</h4>
          <ul class="space-y-2">
            <li v-for="event in session.events" :key="event.id" class="flex items-center">
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { LoaderIcon, Undo2 } from 'lucide-vue-next';
import axios from 'axios';

const sessionsData = ref([]);
const loading = ref(true);
const error = ref(null);

const route = useRoute();
const sessionIds = computed(() => route.params.sessionIds.split(','));

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

const normalizedData = computed(() => {
  return sessionsData.value.map((sessionData) => {
    const startTime = new Date(sessionData.session[0].start_date).getTime();
    return {
      ...sessionData,
      stats: sessionData.stats.map(stat => ({
        ...stat,
        normalizedTime: (new Date(stat.momento).getTime() - startTime) / 1000,
      })),
      events: sessionData.events.map(event => ({
        ...event,
        normalizedTime: (new Date(event.momento).getTime() - startTime) / 1000,
      })),
    };
  });
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const allStatistics = computed(() => {
  const statsSet = new Set();
  normalizedData.value.forEach(session => {
    session.stats.forEach(stat => statsSet.add(stat.nombre));
  });
  return Array.from(statsSet);
});

const getSeriesForStatistic = (statistic) => {
  return normalizedData.value.map(session => ({
    name: `Sesión #${session.session[0].id}`,
    data: session.stats
      .filter(stat => stat.nombre === statistic)
      .map(stat => ({
        x: stat.normalizedTime,
        y: stat.valor,
      })),
  }));
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

const allEvents = computed(() => {
  return normalizedData.value.flatMap(session =>
    session.events.map(event => ({
      ...event,
      sessionId: session.session[0].id,
    }))
  );
});

// Chart options (one for each statistic)
const chartOptions = (statistic) => ({
  chart: {
    type: 'line',
    height: 400,
    animations: { enabled: false },
  },
  xaxis: {
    type: 'numeric',
    title: { text: 'Tiempo (segundos desde el inicio)' },
  },
  yaxis: {
    title: { text: statistic },
  },
  colors: ['#4bc0c0', '#ff6384', '#36a2eb', '#ffcd56', '#9966ff', '#ff9f40'],
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  markers: {
    size: 0,
  },
  tooltip: {
    x: { formatter: (value) => `${value} segundos` },
  },
  annotations: {
    xaxis: allEvents.value.map(event => ({
      x: event.normalizedTime,
      borderColor: getEventColorHex(event.type),
      strokeDashArray: 4,
      label: {
        borderColor: getEventColorHex(event.type),
        style: {
          color: '#fff',
          background: getEventColorHex(event.type),
        },
        text: `${event.type} (Sesión #${event.sessionId})`,
      },
    })),
  },
});

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

const translateStatistic = (statistic) => {
  switch (statistic) {
    case 'MOV_HEAD':
      return 'Movimiento de Cabeza';
    case 'MOV_HAND_RIGHT':
      return 'Movimiento Mano Derecha';
    case 'MOV_HAND_LEFT':
      return 'Movimiento Mano Izquierda';
    default:
      return statistic;
  }
};
onMounted(fetchData);
</script>
