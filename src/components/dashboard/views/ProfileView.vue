<template>
  <div id="profile" class="mx-12 my-8 p-6 bg-white rounded-lg shadow-md">
    <div id="data" class="flex flex-col md:flex-row items-center justify-evenly bg-gray-100 p-6 rounded-lg">
      <div id="image" class="mb-4 md:mb-0">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="w-36 h-36 rounded-full">
      </div>
      <div id="other" class="text-center md:text-left">
        <h2 class="text-2xl font-semibold">{{ name }}</h2>
        <p><b>Email:</b> {{ email }}</p>
        <p><b>University:</b> {{ university }}</p>
      </div>
    </div>

    <div id="doubleBox" class="mt-6 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6">
      <div id="box1" class="doubleBoxItem bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h3 class="text-xl font-semibold mb-4">Evaluator register</h3>
        <p class="mb-4">If you want evaluator's privileges, apply to this form.</p>
        <form>
          <label for="reasons" class="block mb-2">Explain why are you applying:</label>
          <textarea id="reasons" name="reasons" rows="5" class="w-full p-2 border rounded-md" maxlength="240" required></textarea>
          <input type="submit" value="Submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
        </form>
      </div>
      <div id="box2" class="doubleBoxItem bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h3 class="text-xl font-semibold mb-4">Change password</h3>
        <div id="changePswPlaceholders" class="mb-4">
          <p class="mb-1">Enter your current password and the new one twice.</p>
          <p>Then click on submit.</p>
        </div>
        <form>
          <label for="password1" class="block mb-2">Password:</label>
          <input type="password" id="password1" name="password1" class="w-full p-2 border rounded-md" required>
          <label for="newPassword" class="block mt-4 mb-2">New password:</label>
          <input type="password" id="newPassword" name="newPassword" class="w-full p-2 border rounded-md" required>
          <label for="newPassword2" class="block mt-4 mb-2">Repeat new password:</label>
          <input type="password" id="newPassword2" name="newPassword2" class="w-full p-2 border rounded-md" required>
          <p v-if="!isCorrect" class="errorMSG text-red-500 mt-4">{{ errorMSG }}</p>
          <input type="submit" value="Submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useUserStore } from '@/store/useUserStore.js';

export default {
  name: 'ProfileView',

  data() {
    return {
      email: "Email inventado",
      university: "Universidad Inventada Española",
      errorMSG: "Error on password or new password.",
      isCorrect: true,
    }
  },

  computed: {
    ...mapWritableState(useUserStore, ['name', 'email']),
  },
}
</script>

<style scoped>
  .errorMSG {
    text-align: center;
  }
</style>