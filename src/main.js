import { createApp } from 'vue'
import App from './App.vue'

import ant from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import router from './router'


const app=createApp(App)
app.use(router)
app.use(ant)
app.mount('#app')

