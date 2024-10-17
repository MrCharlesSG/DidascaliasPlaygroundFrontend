<template>
  <apexchart class="apexchart" type="line" ref="chart" height="150" 
    :options="chartOptions" :series="series"></apexchart>
</template>


<script>

  export default {    
    name: 'GraphicalStats',
    props: ['title', 'data'],

    data() {
      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example',
            type: 'line',
            height: 500,
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 1000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            },
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: this.title,
            align: 'left',
            offsetY: 18,
          },
          xaxis: {
            range: 15,
          },
        },
        
        series: [{
          name: 'series-1',
          data: [0]
        }],
      }
    },

    watch: {
      data: {
        handler: function(newData) {
          this.series[0].data = newData;
        },
        deep: true
      }
    },

    methods: {
      updateLastData(newVal) {
        this.series[0].data.push(newVal);
      }
    },
  };
</script>

<style scoped>
  .apexchart {
    margin-top: -12px;
    margin-bottom: -12px;
  }
</style>