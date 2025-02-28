<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-2xl text-gray-600 mb-8">Página no encontrada</p>
    <router-link to="/" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
      Volver al inicio
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
}
</script>

<style scoped>
</style>