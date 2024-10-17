<template>
  <div id="stat" style="display:grid; grid-template-columns: 1fr 1fr 2fr;">
    <p>{{ title }}:</p>
    <p class="stateActual">{{ stateActual }}</p>
    <div id="stat1-2" style="display:grid; grid-template-rows: 1fr 1fr;">
      <p>{{ emoji }}</p>
      <p>{{ difference }}</p>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'StateCounter',

  props: ['title', 'data'],

  data () {
    return {
      difference: 0,
      stateActual: 0,
    }
  },

  computed: {
    emoji() {
      return (this.difference > 0) ? '🔺' : '🔻';
    }
  },

  watch: {
    data(newVal, oldVal) {
      this.difference = newVal - oldVal;
      this.stateActual = newVal;
    }
  },
}
</script>

<style scoped>
  #stat {
    align-items: center;
    font-size: 1.15em;
  }

  #stat p {
    margin: 0;
  }

  #stat1-2 p {
    margin: -3px 0;
    font-size: 0.9em;
  }

  .stateActual {
    font-weight: bold;
    text-align: center;
  }
</style>