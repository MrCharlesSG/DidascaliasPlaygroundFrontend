<template>
  <div id="avatarStats" v-if="avatar">
    <div id="section1" class="section">
      <h2 class="show">{{ avatar.name }}</h2>

      <div class="stats">
        <span class="show">
          <StateCounter :title="'Vida'" :data="avatar.stats.life.slice(-1)[0]"/>
          <StateCounter :title="'Attention'" :data="avatar.stats.attention.slice(-1)[0]"/>
          <StateCounter :title="'Learning'" :data="avatar.stats.learning.slice(-1)[0]"/>
          <GraphicalStats :title="'Attention'" :data="avatar.stats.attention"/>
        </span>
      </div>
    </div>

    <div id="section2" class="section">
      <span class="show">
        <GraphicalStats :title="'Learning'" :data="avatar.stats.learning"/>
        <GraphicalStats :title="'Life'" :data="avatar.stats.life" class="mid"/>
        <GraphicalStats :title="'Life'" :data="avatar.stats.life"/>
      </span>
    </div>
  </div>
</template>

<script>
  import StateCounter from './StateCounter.vue';
  import GraphicalStats from './GraphicalStats.vue';

  export default {
    name: 'AvatarStats',
    props: ['avatar', 'show'],

    components: {
      StateCounter,
      GraphicalStats,
    },

    data() {
      return {
      }
    },

    computed: {
      showCss() {
        return this.show ? 'block' : 'none';
      },

      avatarExists() {
        return this.avatar != null && this.avatar != undefined;
      },
    },
  }
</script>

<style scoped>
  #avatarStats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    width: 100%;
  }

  #section1 {
    border-right: 1px solid black;
    height: 100%;
    width: 100%;
  }

  h2 {
    margin: 6px;
  }

  .stats {
    text-align: left;
    padding-left: 15px;
  }

  .stats p {
    margin: 6px 0;
    font-size: 16px;
  }

  .mid {
    margin: -35px 0;
  }

  .show {
    display: v-bind(showCss);
  }

</style>