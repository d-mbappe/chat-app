import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, setActivePinia } from 'pinia';
import router from "./router";
import '@/assets/scss/main.scss';

const app = createApp(App);
const pinia = createPinia();

setActivePinia(pinia);
app.use(pinia);
app.use(router);


app.mount('#app');
