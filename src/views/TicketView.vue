<!-- あるチケットを開いているページ -->

<script setup lang="ts">
import TicketSideBar from '@/components/TicketSideBar.vue'
</script>

<template>
  <v-layout>
    <ticket-side-bar />
    <v-main>
      <h1>TicketView</h1>
    </v-main>
  </v-layout>
</template>
