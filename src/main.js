import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).mount('#app')

import "bootstrap/dist/js/bootstrap.min";
