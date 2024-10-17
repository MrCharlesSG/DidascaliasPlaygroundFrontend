<template>
  <EvaluatorShow/>
  <SessionShow/>
  <EventsList/>
</template>
  
<script>
  import EventsList from '@/components/little_components/EventsList.vue';
  import EvaluatorShow from '@/components/dashboard/general/EvaluatorShow.vue';
  import SessionShow from '@/components/dashboard/general/SessionShow.vue';
  

  export default {
    name: 'DashBoard',

    components: {
      EventsList,
      EvaluatorShow,
      SessionShow,
    },

    data() {
      return {
      
      }
    },

    methods: {
      
    },
  }
</script>

<style scoped>
  

</style>
