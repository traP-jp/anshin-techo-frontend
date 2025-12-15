import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { createPinia } from 'pinia'

import '@fontsource-variable/reddit-sans' // 'Reddit Sans Variable'
import '@fontsource-variable/roboto-mono' // 'Roboto Mono Variable'
import '@fontsource/noto-sans-jp/400.css' // 'Noto Sans JP'
import '@fontsource/noto-sans-jp/700.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
