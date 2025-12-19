<script setup lang="ts">
import ThemeToggle from './components/shared/ThemeToggle.vue'
</script>

<template>
  <v-app>
    <router-view />
    <theme-toggle />
  </v-app>
</template>
