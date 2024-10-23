<template>
    <h2>Ping component</h2>
    <button @click="ping" :disabled="!notRunning">Ping request!</button>
    <!-- <p>From host to server: {{ fromHostToServer }} ms</p> -->
    <!-- <p>From server to host: {{ fromServerToHost }} ms</p> -->
    <br> <br> <p>Lattency: {{ totalTransmissionTime }} ms</p>

    <!--
    <p style="color:red; font-weight: bold;">WARNING</p>
    <p>El tiempo especificado no es fiable. Depende de la diferencia de tiempos de reloj entre los hosts.</p>
        -->
    <p>La petición será enviada al servidor de juego.</p>
</template>

<script>
export default {
    name: 'PingComponent',

    data() {
        return {
            fromHostToServer: "NaN",
            fromServerToHost: "NaN",
            totalTransmissionTime: "NaN",
            notRunning: true,
        }
    },

    methods: {
        ping() {
            if (this.notRunning) {
                // Is not actually running ping
                this.notRunning = false;
                console.log("Sending ping request...");
                
                // Save the current time
                let requestDate = new Date();
                
                // Send the request
                //console.log("Sending ping request to " + process.env.VUE_APP_GAME_SERVER_URL + "/ping")
                fetch("http:/badUri/api" + "/ping")
                .then(response => response.json())
                .then(data => {

                    // Calculate the total transmission time
                    let receivedDate = new Date();
                    this.totalTransmissionTime = receivedDate - requestDate;

                    if (data.ping == "ok") {
                        // Calculate the time from host to server
                        let serverDate = new Date(data.date);
                        this.fromHostToServer = serverDate - requestDate;

                        // Calculate the time from server to host
                        this.fromServerToHost = receivedDate - serverDate;
                    } else {
                        console.log("Error receiving the ping response");
                    }

                    setTimeout(() => {
                        this.notRunning = true;
                    }, 2500);
                })
                .catch(error => {
                    console.log(error)
                    this.notRunning = true;
                });
            } else {
                // Is actually running
                console.log("Ping request already running...");
            }
        }
    },
}
</script>