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
          border: '#34629f',
        },
      },
      dark: {
        colors: {
          background: '#1a1a1a',
          surface: '#2c2c2c',
          border: '#34629f',
        },
      },
    },
  },
})
