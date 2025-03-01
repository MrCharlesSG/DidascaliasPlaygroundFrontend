<template>
  <div id="eventsCall">
    <!--Left button, title, right button at the same row-->
    <div id="title">
      <div class="titleButton">
        <!-- Button decreases the page value-->
        <button v-on:click="page--" v-bind:disabled="!isButtonEnabled(true)">Left</button>
      </div>
      <h1>Events</h1>
      <div class="titleButton">
        <button v-on:click="page++" v-bind:disabled="!isButtonEnabled(false)">Right</button>
      </div>
    </div>

    <!-- Show nine buttons, three per row. Show only 9 of the 21 buttons -->
    <div id="buttons" v-if="!errorStatus">
      <div class="button" v-for="(button, index) in buttons.slice(page * 9, page * 9 + 9)" :key="index">
        <button v-on:click="sendEvent(index)">{{ button }}</button>
      </div>
      <div>
    <input v-model="inputText" type="text" placeholder="Ingrese texto aquí">
    <button @click="enviarTexto(this.inputText)">Enviar</button>
  </div>
    </div>

    <div id="errorText" v-if="errorStatus">
      <h2>{{ errorEventsMessage }}</h2>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "EventsCall",

  data() {
    return {
      buttons: [
        "Loading ...",
      ],
      page: 0,
      errorEventsMessage: "Error retrieving events",
      errorStatus: false,
      inputText: '',
    }
  },

  methods: {
    enviarTexto(inputText)
    {
      console.log("Sending event " + '-1');
      fetch("https://cyclops-dev.uab.cat/api/session/" + this.$route.params.sessionId + "/callEventWS/" + "-1" + "/"+ inputText,
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(response => response.json())
      .then(data => { console.log(data) })
      .catch(error => { console.log(error) });
    },
    getEvents() {
      fetch("https://cyclops-dev.uab.cat/api/session/" + this.$route.params.sessionId + "/available-eventsWS")
      .then(response => response.json())
      .then(retrievedData => {
        if (retrievedData.data == null || retrievedData.data == undefined) {
          throw("This session doesn't have events or you are not logged in");
        }

        if (retrievedData.data.length == 0) {
          this.errorStatus = true;
          this.errorEventsMessage = "No events available";
        }
        else {
          this.buttons = retrievedData.data;
          this.page = 0;
        }
      })
      .catch(error => {
        console.error(error);
        this.errorStatus = true;
        if (typeof error.message == "string" && error.message.includes("Token")) {
          this.errorEventsMessage = error.message;
        }
        else {
          this.errorEventsMessage = "You should log in to use events";
        }
      });
    },

    sendEvent(eventId) {
      console.log("Sending event " + eventId);
      fetch("https://cyclops-dev.uab.cat/api/session/" + this.$route.params.sessionId + "/callEventWS/" + eventId,
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(response => response.json())
      .then(data => { console.log(data) })
      .catch(error => { console.log(error) });
    },

    isButtonEnabled(left) {
      if (left === true) {
        // Left button
        return (this.page > 0);
      } else if (left === false) {
        // Right button
        return (this.page + 1 < Math.abs(this.buttons.length / 9));
      }
    }
  },

  mounted() {
    this.getEvents();
  }
}
</script>

<style scoped>
#eventsCall {
  background-color: lightpink;
}

#title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
}

.titleButton {
  width: 10%;
  margin: 0 25px;
}
/* Style titlebutton buttons */
.titleButton button {
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
}

.titleButton button:not([disabled]):active {
  background-color: #333;
  color: #fff;
}

#buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* More space horizontaly and vertically*/
  margin: 2% 2%;

}

.button {
  width: 25%;
  margin: 10px;
}

.button button {
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 5px;
}

.button button:active {
  background-color: #333;
  color: #fff;
}
/* Button letters bigger*/
.button button {
  font-size: 1.2em;
}

button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}



</style>
