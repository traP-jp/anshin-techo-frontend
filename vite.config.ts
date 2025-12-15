import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    // SASS のアップデートに Vuetify が追いついていないことが原因で出る警告を抑制
    preprocessorOptions: {
      sass: {
        // @ts-expect-error
        api: 'modern-compiler',
        silenceDeprecations: ['if-function'],
      },
      scss: {
        // @ts-expect-error
        api: 'modern-compiler',
        silenceDeprecations: ['if-function'],
      },
    },
  },
})
