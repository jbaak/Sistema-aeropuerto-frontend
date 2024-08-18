<template>
    <container-fluid>
        <row>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <form class="d-flex" @submit.prevent="handleSearchFlights">
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
                            <button class="btn btn-outline-success">Buscar</button>
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
                                
                                <button type="button" class="btn btn-primary" @click="handleSelectedFlight(flight)" v-if="flight.allowBuy">
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
                            <label>Usuaio:  {{ email }}</label>
                            <br>
                            <div class="col-3 m-2">
                                <label>Clase:</label>
                                <select class="form-select" v-model="clase" @change="handleCalcPrice">
                                    <option value="1">Económico</option>
                                    <option value="2">Normal</option>
                                    <option value="3">Ejecutiva</option>
                                    
                                </select>
                                <label>Precio $ {{  priceClass }} MXN</label>

                                
                            </div>
                            <div class="col-12 m-2">
                                
                                <label>Seleccione asiento:</label>
                                <div class="content-seat">
                                    <div class="seat" v-for="(seat, index) in economicSeat" :key="index" @click="handleSlectedSeat(seat)">{{ seat.fila }} {{  seat.letra }}</div>
                                </div>
                                <div>
                                    <label>Asientos seleccionados: </label>
                                    <label v-for="(selectSeat, index) in selectedSeats" :key="index">{{ selectSeat.fila }}{{  selectSeat.letra }}, </label>

                                    <br><label>Total a pagar: </label>
                                    <label> $ {{ totalPrice }} MXN</label>
                                </div>
                                <div>
                                    <a class="btn btn-info m-3">Apartar</a>
                                    <a class="btn btn-info m-3" v-if="pay" @click="saveTicket">Pagar</a>
                                </div>
                            </div>
                        </div>
                        <div id="container-login">
                            <h4>Necesitas estar logeado para continuar</h4>
                            <form @submit.prevent="login">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Correo</label>
                                    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                   
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Contraseña</label>
                                    <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                </div>
                                <div class="col-12 mt-3">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                        <div id="container-dashboard" class="d-none">
                            <h2>Mis boletos </h2>
                            <div class="card m-2" v-for="tic in ticketsR" :key="tic.id">
                                <div class="card-body">
                                    <h5 class="card-title">MID - {{  tic.destination.name }}</h5>
                                    <p class="card-text">{{  tic.flight.date }}</p>
                                    <p class="card-text" >{{ tic.airline.name }}</p>
                                    <p class="card-text" >Asiento {{  tic.seat }} -  Clase: {{ tic.clase }}</p>
                                
                                </div>
                            </div>
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
    axios.defaults.baseURL = 'http://localhost/api/v1';
    
    let cities = ref([]);
    let airlines = ref([]);
    let destination = ref('');
    let airline = ref('');
    let startDate = ref('');
    let flights = ref([]);
    let clase = ref('1');
    let flightSelected = ref({});
    let priceClass = ref(0)
    let selectedSeats = ref([])
    let totalPrice = ref(0)
    let email = ref('');
    let password = ref('');
    let pay = ref(false)
    let ticketsR = ref([])

    let economicSeat = ref([
        {fila:1, letra: 'A'},
        {fila:1, letra: 'B'},
        {fila:1, letra: 'C'},
        {fila:1, letra: 'D'},
        {fila:2, letra: 'A'},
        {fila:2, letra: 'B'},
        {fila:2, letra: 'C'},
        {fila:2, letra: 'D'},
        {fila:3, letra: 'A'},
        {fila:3, letra: 'B'},
        {fila:3, letra: 'C'},
        {fila:3, letra: 'D'},
        {fila:4, letra: 'A'},
        {fila:4, letra: 'B'},
        {fila:4, letra: 'C'},
        {fila:4, letra: 'D'},
        {fila:5, letra: 'A'},
        {fila:5, letra: 'B'},
        {fila:5, letra: 'C'},
        {fila:5, letra: 'D'},
    ])


    const handleSearchFlights = async () => {
        try {
            const responseFlights = await axios.get("/flights?destination="+destination.value+ "&date="+startDate.value+"&airline="+airline.value);    
            flights.value = responseFlights.data.flights
            console.log(responseFlights.data.flights)
        } catch (error) {
            console.error('Error fetching flights:', error);
        }

    }

    const handleSelectedFlight =  (flight) => {
        const el = document.querySelector('#checkout');
        el.classList.remove("d-none");
        flightSelected.value = flight
        priceClass.value = parseFloat(flightSelected.value.basic_price)
        selectedSeats.value = []
        totalPrice.value = 0
        console.log(flightSelected.value)

    }

    const handleCalcPrice =  () => {
        priceClass.value = parseFloat(flightSelected.value.basic_price)
        if (clase.value == 2) {
            priceClass.value = (0.35 * priceClass.value ) + priceClass.value
        }

        if (clase.value == 3) {
            priceClass.value = (0.45 * priceClass.value ) + priceClass.value
        }
         
        console.log(priceClass.value)
    }

    const handleSlectedSeat = (seat) => {
        selectedSeats.value.push(seat)
        console.log(selectedSeats)

        let totalSeats = selectedSeats.value.length
        totalPrice.value = totalSeats * priceClass.value
    }

    const login = async () => {
        let payload = {
            email: email.value,
            password: password.value
        }

        try {
            const responseLogin = await axios.post("/login", payload)
            
            if (responseLogin.data.access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${responseLogin.data.access_token}`
                const cSeat = document.querySelector('#container-seat');
                cSeat.classList.remove("d-none");

                const cLogin = document.querySelector('#container-login');
                cLogin.classList.add("d-none");
                localStorage.setItem( 'token', responseLogin.data.access_token )

                if (hasRole(responseLogin.data.access_token, "premium")) {
                    pay.value = true
                }

            } 
            
        } catch (error) {
            alert('Los datos no son correctos');
            console.error('Error login:', error);
        }

    }

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    function hasRole(token, role) {
        let payloadUser = parseJwt(token)
        return payloadUser.roles.includes(role);
    }

    const saveTicket = async () => {

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

    }

    const getTickets = async () => {
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
    }


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
.seat {
    background-color: blue;
    width: 50px;
    height: 50px;
    margin: 5px;
    display: inline-block;
    vertical-align: top;
    color: white;
    padding: 5px;
}

.seat:hover {
    background-color: gray;
    cursor: pointer;
}

.seat:nth-child(2), .seat:nth-child(6), .seat:nth-child(10), .seat:nth-child(14) , .seat:nth-child(18) {
    margin-right: 20px; 
}

.content-seat {
    width: 260px;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>