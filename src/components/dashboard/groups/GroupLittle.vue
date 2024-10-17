<template>
  <div id="group">
    <h3 class="groupName" id="groupItem">{{ name }}</h3>
    <div id="groupTutorInfo">
      <img class="groupTutorAvatar" id="groupItem" src="@/assets/avatars/default.jpeg" alt="Group Avatar"/>
      <div id="groupTutorNameEmail">
        <p class="groupTutorName" id="groupItem">{{ tutorName }}</p>
        <p class="groupTutorEmail" id="groupItem">{{ tutorEmail }}</p>
      </div>
    </div>
    <div id="groupMoreInfo">
      <div>
        <h4>Course:</h4>
        <p>{{ course }}</p>
      </div>
      <div>
        <h4>Year:</h4>
        <p>{{ year }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupLittle',

  props: ['groupInfo'],

  computed: {
    name() {
      return (this.groupInfo.name) ? this.groupInfo.name : "NaN";
    },

    tutorName() {
      return (this.groupInfo.tutorName) ? this.groupInfo.tutorName : "NaN";
    },

    tutorEmail() {
      return (this.groupInfo.tutorEmail) ? this.groupInfo.tutorEmail : "NaN";
    },

    course() {
      return (this.groupInfo.course) ? this.groupInfo.course : "NaN";
    },

    year() {
      return (this.groupInfo.year) ? this.groupInfo.year : "NaN";
    },

  }
}
</script>

<style scoped>
  #group {
    background-color: #e0e0e0;
    width: 300px;
    height: 185px;
    padding-left: 20px;
    border-radius: 10px;
  }

  .groupName {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left : 10px;
  }

  #groupTutorInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 20px;
    background-color: #f2f2f2;
    border-radius: 40px;
  }

  .groupTutorAvatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  #groupTutorNameEmail {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  #groupTutorNameEmail p {
    margin: 0;
    margin-top: 2.5px;
  }

  #groupMoreInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;
  }

  #groupMoreInfo p, #groupMoreInfo h4 {
    margin: 0;
  }
</style>