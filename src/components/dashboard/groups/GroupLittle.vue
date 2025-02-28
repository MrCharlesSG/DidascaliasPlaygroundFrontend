<template>
  <div id="group" class="bg-gray-200 w-72 h-56 p-3 rounded-lg shadow-md">
    <h3 class="groupName text-xl font-bold mb-2 ml-2">{{ name }}</h3>
    <div id="groupTutorInfo" class="flex flex-row items-center mb-2 ml-1 mr-5 bg-gray-300 rounded-full p-2">
      <img class="groupTutorAvatar w-12 h-12 rounded-full mr-2" src="@/assets/avatars/default.jpeg" alt="Group Avatar"/>
      <div id="groupTutorNameEmail" class="flex flex-col ml-5">
        <p class="groupTutorName m-0 mt-1">{{ tutorName }}</p>
        <p class="groupTutorEmail m-0 mt-1">{{ tutorEmail }}</p>
      </div>
    </div>
    <div id="groupMoreInfo" class="flex flex-row justify-around mt-5">
      <div>
        <h4 class="font-semibold">Course:</h4>
        <p>{{ course }}</p>
      </div>
      <div>
        <h4 class="font-semibold">Year:</h4>
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
  /* Tailwind CSS classes applied directly in the template */
</style>