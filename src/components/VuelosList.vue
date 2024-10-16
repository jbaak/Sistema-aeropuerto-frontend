<template>
    <container-fluid>
        <row>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <form class="d-flex">
                        <div class="col-3 m-2">
                            <label>Destino</label>
                            <select class="form-select" v-model="destination">
                                <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                            </select>
                        </div>
                        <div class="col-3 m-2">
                            <label>Aerolinea</label>
                            <select class="form-select" v-model="airline">
                                <option v-for="airline in airlines" :key="airline.id" :value="airline.id">{{ airline.name }}</option>
                            </select>
                        </div>
                        <div class="col-3 m-2">
                            <label>Fecha</label>
                            <input class="form-control me-2" type="date" placeholder="Fecha de salida" v-model="startDate">
                        </div>
                        <div class="col-3 m-2 mt-4"> 
                            <button class="btn btn-outline-success" @click.prevent="handleSearchFlights">Buscar</button>
                        </div>
                   
                    </form>
                </div>
            </nav>
            <section class="wrapper">
                <div class="container">
                <row>
                    <div class="col-12">
                        <div class="card m-2" v-for="flight in flights" :key="flight.id">
                            <div class="card-header" >
                                {{ flight.airline.name }}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">MID - {{  flight.destination.name }}</h5>
                                <p class="card-text">{{  flight.date }} - Duración: {{ flight.duration_hour }} h {{  flight.duration_min }} m</p>
                                <p class="card-text" >Desde $ {{  flight.basic_price }} MXN</p>
                                
                                <button type="button" class="btn btn-primary" @click="storeFlight.handleSelectedFlight(flight)">
                                    Seleccionar
                                </button>
                                <!-- Button trigger modal -->
                            </div>
                        </div>
                    </div>
                    
                    
                </row>
            </div>   
            </section>
            <div id="checkout" class="d-none">
                <div class="container">
                    <row>
                        <div class="col d-none" id="container-seat">
                            <SeatList/>
                        </div>
                        <div id="container-login">
                            <LoginNew/>
                        </div>
                    </row>
                </div>
            </div>
        </row>
    </container-fluid>
    
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from "axios";
    import LoginNew from './LoginNew.vue';
    import SeatList from './SeatList.vue';
    import useFlight from '@/store/flight';

    const storeFlight = useFlight()

    axios.defaults.baseURL = 'http://localhost/api/v1';
    
    let cities = ref([]);
    let airlines = ref([]);
    let destination = ref('');
    let airline = ref('');
    let startDate = ref('');
    let flights = ref([]);
    //let ticketsR = ref([])

    const handleSearchFlights = async () => {
        try {
            const responseFlights = await axios.get("/flights?destination="+destination.value+ "&date="+startDate.value+"&airline="+airline.value);    
            flights.value = responseFlights.data.flights
            console.log(responseFlights.data.flights)
        } catch (error) {
            console.error('Error fetching flights:', error);
        }

    }

    
    /*function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    function hasRole(token, role) {
        let payloadUser = parseJwt(token)
        return payloadUser.roles.includes(role);
    }*/

    /*const saveTicket = async () => {

        if(selectedSeats.value.length==0) {
            alert('seleccione algun asiento')
        } else {
            let ticket = {}

            //let token = localStorage.getItem ('token')
            await selectedSeats.value.forEach(function(seat) {
                ticket = {
                    flight_id : flightSelected.value.id,
                    category_id: clase.value,
                    passenger_name: "jesus",
                    passenger_lastname : "baak",
                    seat_number: seat.fila + seat.letra 
                }

                try { 
                    axios.post("/auth/tickets", ticket)
                } catch (error) {
                    console.error('Error save ticket:', error);
                }       
            });
            getTickets()

        }

    }*/

    /*const getTickets = async () => {
        const cSeat = document.querySelector('#container-seat');
        cSeat.classList.add("d-none");

        const cLogin = document.querySelector('#container-login');
        cLogin.classList.add("d-none");

        const cDash = document.querySelector('#container-dashboard');
        cDash.classList.remove("d-none")

        try { 
            const responseGetTickets =  await axios.get("/auth/tickets")
            ticketsR.value = responseGetTickets.data.tickets
        } catch (error) {
            console.error('Error tickets:', error);
        }        
    }*/


    onMounted(async () => {    
    let response = await axios.get("/cities" );    
    cities.value = response.data.cities

    let responseAirline = await axios.get("/airlines" );    
    airlines.value = responseAirline.data.airlines
    });

</script>

<style scoped>
.wrapper {
    width: 100%;
}

#checkout {
    width: 50%;
    height: 100%;
    background-color: #f0f0f0;
    position: absolute;
    top:0;
    right: 0;
    padding: 20px;
    position: fixed;

}
</style>