<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
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
