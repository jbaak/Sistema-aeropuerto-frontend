<template>
    <div class="container">
        <row>          
            <div id="container">
                <h4>Login</h4>
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
        </row>
    </div>
    
</template>

<script setup>
    /*import { ref } from 'vue'

    let email = ref('');
    let password = ref('');

    const login = async () => {
        let payload = {
            email: email.value,
            password: password.value
        }


    }*/

</script>

<style scoped>
.wrapper {
    width: 100%;
}

</style>