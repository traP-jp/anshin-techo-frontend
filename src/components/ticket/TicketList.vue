<script setup lang="ts">
import { dummyTickets } from '@/dummy'
import UserIcon from '@/components/shared/UserIcon.vue'
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
      <template #[`item.assignee`]="{ item }">
        <div>
          <user-icon :id="item.assignee" :size="32" />
        </div>
      </template>
      <template #[`item.due`]="{ item }">
        {{ item.due ? getDateRepresentation(item.due) : '-' }}
      </template>
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
