import { defineStore } from "pinia";

const useFlight = defineStore('flight', {
    state: ()=>{
        return {
            flightSelected: null,
            selectedSeats: [],
            totalPrice: 0,
            priceClass: 0,
            pay: false,
            baseURL: 'http://localhost/api/v1'
        }
    },
    actions: {
        async login(email, password) {
            const uri = `${this.baseURL}/login`
            const rawResponse = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            })

            const response = await rawResponse.json()

            if (response.access_token) {
                this.token = response.access_token
                return true
            } else {
                return false
            }
        },
        handleSelectedFlight(flight){
            const el = document.querySelector('#checkout');
            el.classList.remove("d-none");
            this.flightSelected = flight
            this.priceClass = parseFloat(this.flightSelected.basic_price)
            this.selectedSeats = []
            this.totalPrice = 0
            console.log(this.flightSelected)
    
        },
        handleSlectedSeat(seat) {
            this.selectedSeats.push(seat)
            console.log(this.selectedSeats)
    
            let totalSeats = this.selectedSeats.length
            this.totalPrice = totalSeats * this.priceClass
        },
        handleCalcPrice(event) {
            let clase = event.target.value
            this.selectedSeats = []
            this.totalPrice = 0
            this.priceClass = parseFloat(this.flightSelected.basic_price)
            if (clase == '2') {
                this.priceClass = (0.35 * this.priceClass ) + this.priceClass
            }
    
            if (clase == '3') {
                this.priceClass = (0.45 * this.priceClass ) + this.priceClass
            }
             
            console.log(this.priceClass)
        }
    }
})

export default useFlight