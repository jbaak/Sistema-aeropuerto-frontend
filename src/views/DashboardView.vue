<template>
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
</template>

<script setup>
</script>

<style scoped>
</style>