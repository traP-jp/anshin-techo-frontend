<script setup lang="ts">
import { dummyTickets } from '@/dummy'
import UserIcon from '@/components/shared/UserIcon.vue'
import TicketStatusLabel from '@/components/ticket/TicketStatusLabel.vue'
import { getDateRepresentation } from '@/utils/date'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'ステータス', key: 'status' },
  { title: 'タイトル', key: 'title' },
  { title: '相手の団体名', key: 'client' },
  { title: '担当', key: 'assignee' },
  { title: '期日', key: 'due' },
  { title: '最終更新', key: 'updated_at' },
]
</script>

<template>
  <div :class="$style.container">
    <v-data-table
      :headers="headers"
      :items="dummyTickets"
      class="no-border-table"
      :class="$style.headerRow"
    >
      <!-- ステータス欄 -->
      <template #[`item.status`]="{ item }">
        <ticket-status-label :status="item.status" />
      </template>

      <!-- 担当者欄 -->
      <template #[`item.assignee`]="{ item }">
        <user-icon :id="item.assignee" :size="32" />
      </template>

      <!-- 期日欄 -->
      <template #[`item.due`]="{ item }">
        <!-- nullになる場合は - で表示 -->
        {{ item.due ? getDateRepresentation(item.due) : '-' }}
      </template>

      <!-- 最終更新欄 -->
      <template #[`item.updated_at`]="{ item }">
        {{ getDateRepresentation(item.updated_at) }}
      </template>
    </v-data-table>
  </div>
</template>

<style module>
.container {
  width: 80%;
}
/* headerの文字色を変更 */
.headerRow :global(thead th) {
  color: grey;
}
</style>
