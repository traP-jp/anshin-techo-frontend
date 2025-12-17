<script setup lang="ts">
import { dummyTickets } from '@/dummy'
import UserIcon from '@/components/shared/UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
import { statusMap } from '@/utils/ticketStatus'

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
        <div class="d-flex align-center">
          <v-icon :color="statusMap[item.status]?.color" size="large" class="mr-1">
            {{ statusMap[item.status]?.icon }}
          </v-icon>
          <!-- iconのカラーが「info」だったら「text-info」みたいにテキストのカラー名をiconと同じにする -->
          <span :class="`text-${statusMap[item.status]?.color}`">
            {{ statusMap[item.status]?.label }}
          </span>
        </div>
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
