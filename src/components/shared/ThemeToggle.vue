<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)
// theme.global.name.value === 'system' のときにも正しくダークモードを判定

const toggleTheme = async () => {
  try {
    document.documentElement.classList.add('no-transition')
    const next = isDark.value ? 'light' : 'dark'

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document.startViewTransition) {
      await document.startViewTransition(() => themeStore.setTheme(next)).ready
    } else {
      themeStore.setTheme(next)
    }
  } finally {
    document.documentElement.classList.remove('no-transition')
  }
}
</script>

<template>
  <v-btn
    class="position-fixed top-0 right-0 ma-2 z-1000"
    :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    variant="text"
    @click="toggleTheme"
  />
</template>
