import { createApp } from 'vue'
import pinia from './store'
import router from './router'
import App from './App.vue'
import './plugins/smartfetch'

import 'ant-design-vue/dist/antd.css'
import '@/styles/index.scss'

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
