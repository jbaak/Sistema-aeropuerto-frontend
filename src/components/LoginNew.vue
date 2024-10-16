<template>
    <div class="container">
        <row>          
            <div id="container">
                <h4>Login</h4>
                <form >
                    <div class="form-group">
                        <label for="exampleInputEmail1">Correo</label>
                        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contraseña</label>
                        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="col-12 mt-3">
                        <button type="submit" class="btn btn-primary" @click.prevent="handleLogin">Login</button>
                    </div>
                </form>
            </div>
        </row>
    </div>
    
</template>

<script setup>

    import {ref} from 'vue'
    import useAuth from '@/store/auth'
    //import router from '@/router';

    const email = ref('')
    const password = ref('')
    const store = useAuth()

    const handleLogin = async () => {
        const response = await store.login(email.value, password.value)
        if (response == false) {
            alert("error al logearse")
        } else {
            //router.push({ name: 'userList'})
            const cSeat = document.querySelector('#container-seat');
            cSeat.classList.remove("d-none");

            const cLogin = document.querySelector('#container-login');
            cLogin.classList.add("d-none");
        }
    }  

</script>

<style scoped>
.wrapper {
    width: 100%;
}

</style>