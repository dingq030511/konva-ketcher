import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueKonva from 'vue-konva';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(VueKonva);
app.use(createPinia());
app.mount('#app');
