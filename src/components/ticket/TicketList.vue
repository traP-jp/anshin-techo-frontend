<script setup lang="ts">
import { dummyTickets } from '@/dummy'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'タイトル', key: 'title' },
  { title: 'ステータス', key: 'status' },
  { title: '担当者', key: 'assignee' },
  { title: '作成日', key: 'created_at' },
]
</script>

<template>
  <div :class="$style.container">
    <v-data-table :headers="headers" :items="dummyTickets" class="elevation-1"></v-data-table>
  </div>
</template>

<style module>
.container {
  width: 100%;
}
</style>
