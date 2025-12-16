import { createApp } from 'vue'
import './styles/base.css'
import App from './App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { createPinia } from 'pinia'
import { useUserStore } from './store'

import '@fontsource-variable/reddit-sans' // 'Reddit Sans Variable'
import '@fontsource-variable/roboto-mono' // 'Roboto Mono Variable'
import '@fontsource-variable/noto-sans-jp' // 'Noto Sans JP Variable'
import '@fontsource-variable/inter' // 'Inter Variable'

const pinia = createPinia()

async function initializeApp() {
  const app = createApp(App)

  app.use(pinia)
  app.use(router)
  app.use(vuetify)

  const userStore = useUserStore()
  await userStore.initUser()

  app.mount('#app')
}

initializeApp().catch(console.error)
