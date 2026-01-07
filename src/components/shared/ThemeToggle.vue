<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = async () => {
  try {
    document.documentElement.classList.add('no-transition')
    const next = isDark.value ? 'light' : 'dark'

    if (document.startViewTransition) {
      await document.startViewTransition(() => theme.change(next)).ready
    } else {
      theme.change(next)
    }
  } finally {
    document.documentElement.classList.remove('no-transition')
  }
}
</script>

<template>
  <v-btn
    class="position-fixed top-0 right-0 ma-2 z-10"
    :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    variant="text"
    @click="toggleTheme"
  />
</template>
