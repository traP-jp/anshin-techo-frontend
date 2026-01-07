<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = async () => {
  document.documentElement.classList.add('no-transition')
  const next = isDark.value ? 'light' : 'dark'

  if (document.startViewTransition) {
    await document.startViewTransition(() => {
      theme.global.name.value = next
    }).ready
  } else {
    theme.global.name.value = next
  }
  document.documentElement.classList.remove('no-transition')
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
