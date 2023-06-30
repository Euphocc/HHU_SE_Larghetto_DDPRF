import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import './style.css'
import App from './App.vue'
import axios from 'axios'

const pinia = createPinia()
let app = createApp(App)
axios.defaults.timeout = 180000;// 三分钟超时时间，为可能需要的训练时长进行预留。

app.use(router, axios).use(pinia).mount('#app')
