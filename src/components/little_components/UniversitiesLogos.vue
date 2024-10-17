<template>
  <div id="universitiesLogo">
  <table>
      <tr>
        <td> <img src="../../assets/logos/UCM.gif" alt="UCM" class="logoUCM"/> </td>
        <td> <img src="../../assets/logos/UAB.png" alt="UAB" class="logoUAB"/> </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'UniversitiesLogos',
  props: ['type'],

  data() {
    return {
      
    }
  },

  computed: {
    fix() {
      return (this.type && this.type == 'sidebar') ? 5 : 20 + 'px 0';
    }
  },
}
</script>


<style scoped>
  #universitiesLogo table {
    margin: auto;
    border-spacing: v-bind(fix);
    
  }

  #universitiesLogo img {
    margin: 0 auto;
    display: block;
  }

  .logoUCM {
    width: 150px;
    height: 140px;
  }

  .logoUAB {
    width: 150px;
    height: 75px;
  }
</style>