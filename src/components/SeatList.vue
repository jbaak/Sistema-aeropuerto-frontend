<template>
    <label>Usuaio:  {{ email }}</label>
    <br>
    <div class="col-3 m-2">
        <label>Clase:</label>
        <select class="form-select" v-model="clase" @change="storeFlight.handleCalcPrice($event)">
            <option value="1">Económico</option>
            <option value="2">Normal</option>
            <option value="3">Ejecutiva</option>
            
        </select>
        <label>Precio $ {{  storeFlight.priceClass }} MXN</label>

        
    </div>
    <div class="col-12 m-2">
        
        <label>Seleccione asiento:</label>
        <div class="content-seat">
            <div class="seat" v-for="(seat, index) in economicSeat" :key="index" @click="storeFlight.handleSlectedSeat(seat)">{{ seat.fila }} {{  seat.letra }}</div>
        </div>
        <div>
            <label>Asientos seleccionados: </label>
            <label v-for="(selectSeat, index) in storeFlight.selectedSeats" :key="index">{{ selectSeat.fila }}{{  selectSeat.letra }}, </label>

            <br><label>Total a pagar: </label>
            <label> $ {{ storeFlight.totalPrice }} MXN</label>
        </div>
        <div>
            <a class="btn btn-info m-3">Apartar</a>
            <a class="btn btn-info m-3" v-if="storeFlight.pay" @click="saveTicket">Pagar</a>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import useFlight from '@/store/flight';

    const storeFlight = useFlight()
    let clase= ref(1);

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

</script>

<style scoped>
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