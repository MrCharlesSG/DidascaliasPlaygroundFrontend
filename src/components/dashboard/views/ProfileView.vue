<template>
  <div id="profile">

    <div id="data">
      <div id="image">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style="width: 150px; height: 150px; border-radius: 50%;">
      </div>

      <div id="other">
        <h2>{{ name }}</h2>
        <p><b>Email:</b> {{ email }}</p>
        <p><b>University:</b> {{ university }}</p>
      </div>
    </div>

    <div id="doubleBox">
      <div id="box1" class="doubleBoxItem">
        <h3>Evaluator register</h3>
        <p>If you want evaluator's privileges, apply to this form.</p>
        <br> 
        <form>
          <label for="reasons">Explain why are you applying:</label>
          <br>
          <!--big input text-->
          <textarea id="reasons" name="reasons" rows="5" cols="50"  maxlength="240" required></textarea>
          <br> <br>

          <input type="submit" value="Submit">
        </form>
      </div>
      <div id="box2" class="doubleBoxItem">
        <h3>Change password</h3>

        <div id="changePswPlaceholders">
          <p style="margin-bottom: 4px;">Enter your current password and the new one twice.</p>
          <p>Then click on submit.</p>
        </div>
        <br>

        <form>
          <label for="password1">Password:   </label>
          <input type="password" id="password1" name="password1" required>
          <br> <br>

          <label for="password">New password:   </label>
          <input type="password" id="newPassword" name="newPassword" required>
          <br>

          <label for="newPasswor2d">Repeat new password:   </label>
          <input type="password" id="newPassword2" name="newPassword2" required>
          <br> <br>

          <p v-if="!isCorrect" class="errorMSG">{{ errorMSG }}</p>
          <input type="submit" value="Submit" style="margin-bottom: 0;">
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
  #profile {
    margin: 35px 50px;
    border-radius: 15px;
  }

  h2 {
    margin-bottom: 15px;
    margin-top: 0;
    text-align: center;
    font-size: 1.75em;
  }

  #data {
    border-radius: 15px;
    margin: 0 auto;
    text-align: center;
    background-color: #f5f5f5;

    display: flex;
    flex-direction: row;
    padding: 2%;
    justify-content: space-evenly;
  }

  #image {
    vertical-align: middle;
    margin-left: 10px;
  }

  #other {
    vertical-align: middle;
    margin: auto;
  }

  #doubleBox {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .doubleBoxItem {
    background-color: #f5f5f5;
    border-radius: 15px;
    padding: 2%;
    width: 45%;
  }

  .doubleBoxItem h3 {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }

  .doubleBoxItem p {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }

  .doubleBoxItem form {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }

  .doubleBoxItem form input {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }

  .errorMSG {
    color: red;
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }

  hr {
    border-top: 4px dotted black;
    border-bottom: none;
  }
</style>