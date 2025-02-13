import './assets/main.css'

import {createApp, type Directive} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App);

app.use(createPinia())

app.mount('#app');
