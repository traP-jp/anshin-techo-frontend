import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
