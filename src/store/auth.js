import { defineStore } from "pinia";

const useAuth = defineStore('auth', {
    state: ()=>{
        return {
            token: null,
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
        }
    }
})

export default useAuth