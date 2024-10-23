<template>
  <div id="globalStats">
    <h1>Global Stats</h1>

    <div id="stats" v-if="this.actualData">
      <div class="stat">
        <h2 class="statName">velHead</h2>
        <div class="statValue">{{ this.actualData.input.velHead }}</div>
      </div>
      <div class="stat">
        <h2 class="statName">velRight</h2>
        <div class="statValue">{{ this.actualData.input.velHandDer }}</div>
      </div>
      <div class="stat">
        <h2 class="statName">velIzq</h2>
        <div class="statValue">{{ this.actualData.input.velHandIzq }}</div>
      </div>
      <div>
        <GraphicalStats :data="infoToGraph.velHead" :title="'velHead'" class="hide"/>
        <GraphicalStats :data="infoToGraph.velHandDer" :title="'velHandDer'" class="hide"/>
        <GraphicalStats :data="infoToGraph.velHandIzq" :title="'velHandIzq'" class="hide"/>
        <GraphicalStats :data="moreUsed" :title="'More changed (' + moreUsedName + ')'" />

      </div>

    </div>

    <h2 v-if="!this.actualData" style="margin-top: 120px;">There are no global stats in this session</h2>
  </div>
</template>

<script>
import GraphicalStats from './GraphicalStats.vue';

  export default {
    name: 'GlobalStats',
    props: ['sessionID'],
    data() {
      return {
        actualData: {
          input: {
            velHead: 0,
            velHandDer: 0,
            velHandIzq: 0,
            typeMax: 0,
          }
        },

        infoToGraph: {
          velHead: [0],
          velHandDer: [0],
          velHandIzq: [0],
        },

        intervalId : null,
      };
    },
    methods: {
        fetchData() {
            fetch("http:/badUri/api/session/" + this.sessionID + "/ongoingWS")
                .then(response => response.json())
                .then(retrievedData => {
                this.actualData = retrievedData.data;
                if (this.actualData != null && this.actualData != undefined)
                {
                  this.infoToGraph.velHead.push(parseFloat((this.actualData.input.velHead * 100).toFixed(2)));+
                  this.infoToGraph.velHandDer.push(parseFloat((this.actualData.input.velHandDer * 100).toFixed(2)));
                  this.infoToGraph.velHandIzq.push(parseFloat((this.actualData.input.velHandIzq * 100).toFixed(2)));
                }
            })
            .catch(error => console.error(error));
        }
    },
    mounted() {
      this.intervalId = setInterval(this.fetchData, 1000);
    },
    beforeUnmount() {
      clearInterval(this.intervalId);
    },

    computed: {
      moreUsed() {
        if (this.actualData.input.typeMax == 0)
          return this.infoToGraph.velHead;
        if (this.actualData.input.typeMax == 1)
          return this.infoToGraph.velHandIzq;
        if (this.actualData.input.typeMax == 2)
          return this.infoToGraph.velHandDer;
        
        return this.infoToGraph.velHead;
      },

      moreUsedName() {
        if (this.actualData.input.typeMax == 0)
          return 'velHead';
        if (this.actualData.input.typeMax == 1)
          return 'velHandIzq';
        if (this.actualData.input.typeMax == 2)
          return 'velHandDer';
        
        return 'velHead';
      }
    },

    components: { GraphicalStats }
}
</script>

<style scoped>

  #globalStats {
    background-color: lightblue;
    position: relative;
  }

  #globalStats h1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    color: #505050;
    z-index: 0;
  }

  #globalStats #stats {
    padding-top: 65px;
  }

  #globalStats .stat {
    display: inline-block;
    width: 33%;
    text-align: center;
    padding-bottom: 20px;
  }

  #globalStats .statName {
    margin: 0;
    color: #505050;
  }

  #globalStats .statValue {
    margin: 0;
    font-size: 2em;
    color: #505050;
  }

  .hide {
    display: none;
  }
  
</style>