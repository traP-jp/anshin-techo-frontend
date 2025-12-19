import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#f2f3f8',
          surface: '#ffffff',
          border: '#a2a3a6',
          input: '#4c00ff',
          hidden: '#ff3c00',
          visible: '#0066ff',
        },
      },
      dark: {
        colors: {
          background: '#1a1a1a',
          surface: '#2c2c2c',
          border: '#717171',
          input: '#ff54f1ff',
          hidden: '#ff6131ff',
          visible: '#0095ff',
        },
      },
    },
  },
})
