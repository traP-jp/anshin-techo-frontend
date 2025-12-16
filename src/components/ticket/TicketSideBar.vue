<script setup lang="ts"></script>

<template>
  <v-navigation-drawer permanent :width="300">
    <template #prepend>
      <div class="pa-2">一番上</div>
      <v-divider />
    </template>
    <template #append>
      <v-divider />
      <div class="pa-2">一番下</div>
    </template>
  </v-navigation-drawer>
</template>
