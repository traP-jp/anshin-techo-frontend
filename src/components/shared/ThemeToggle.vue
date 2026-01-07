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
    :class="$style.toggle"
    :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    variant="text"
    @click="toggleTheme"
  />
</template>

<style module>
.toggle {
  position: fixed !important;
  top: 8px;
  right: 8px;
  z-index: 1000;
}
</style>
