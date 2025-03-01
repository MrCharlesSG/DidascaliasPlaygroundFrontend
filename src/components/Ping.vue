<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Ping component</h2>
        <button @click="ping" :disabled="!notRunning" class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">Ping request!</button>
        <br><br>
        <p class="mt-4">Latency: {{ totalTransmissionTime }} ms</p>
        <p class="mt-4 text-red-600 font-bold">WARNING</p>
        <p class="text-red-600">El tiempo especificado no es fiable. Depende de la diferencia de tiempos de reloj entre los hosts.</p>
        <p class="mt-4">La petición será enviada al servidor de juego.</p>
    </div>
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
                fetch("https://cyclops-dev.uab.cat/api" + "/ping")
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