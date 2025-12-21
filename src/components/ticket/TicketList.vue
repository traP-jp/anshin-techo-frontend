<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useTicketFilter } from '@/utils/filter'
import UserIcon from '@/components/shared/UserIcon.vue'
import TicketStatusLabel from '@/components/ticket/TicketStatusLabel.vue'
import { getDateRepresentation } from '@/utils/date'
import { dummyTickets } from '@/dummy'

// 画面遷移にuseRouterを使う
const router = useRouter()

// チケットを全聚徳
const tickets = ref(dummyTickets)

// フィルターを初期化
const { filteredTickets, register } = useTicketFilter(tickets)

// 各フォームに設定するmodelとitemを定義
const { value: statusModel, items: statusOptions } = register('status')
const { value: assigneeModel, items: assigneeOptions } = register('assignee')
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'ステータス', key: 'status' },
  { title: 'タイトル', key: 'title' },
  { title: '相手の団体名', key: 'client' },
  { title: '担当', key: 'assignee' },
  { title: '期日', key: 'due' },
  { title: '最終更新', key: 'updated_at' },
]

//
const handleRowClick = (_: object, { item }: { item: Ticket }) => {
  void router.push({ name: 'Ticket', params: { id: item.id } })
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.filters">
      <!-- ステータスフィルター -->
      <v-select
        v-model="statusModel"
        :items="statusOptions"
        label="ステータス"
        multiple
        clearable
        density="compact"
        variant="outlined"
        hide-details
        :class="$style.filterItem"
      >
        <template #selection="{ item }">
          <!-- 2個以上選んだらiconOnlyのスタイルになる。 -->
          <div :class="{ [$style.iconOnly]: statusModel.length > 1 }">
            <ticket-status-label :status="item.raw" />
          </div>
        </template>

        <template #item="{ item, props }">
          <v-list-item v-bind="props">
            <template #title>
              <ticket-status-label :status="item.raw" />
            </template>
          </v-list-item>
        </template>
      </v-select>

      <!-- 担当者フィルター -->
      <v-combobox
        v-model="assigneeModel"
        :items="assigneeOptions"
        label="担当者"
        variant="outlined"
        multiple
        density="compact"
        :class="$style.filterItem"
        hide-details
      >
        <template #selection="{ item }">
          <user-icon :id="item.raw" :size="24" />
        </template>
        <template #item="{ item, props: itemProps }">
          <v-list-item v-bind="itemProps" :class="$style.listItem">
            <template #title>
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-checkbox-btn
                    :model-value="(assigneeModel as string[]).includes(item.raw)"
                    readonly
                  />
                  <div>{{ item.raw }}</div>
                </div>
                <user-icon :id="item.raw" :size="24" />
              </div>
            </template>
          </v-list-item>
        </template>
      </v-combobox>
    </div>

    <v-data-table
      :headers="headers"
      :items="filteredTickets"
      class="no-border-table"
      :class="$style.headerRow"
      hover
      @click:row="handleRowClick"
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
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.filterItem {
  min-width: 150px;
  max-width: 200px;
  flex-grow: 1;
}
.iconOnly span {
  display: none;
}
/* headerの文字色を変更 */
.headerRow :global(thead th) {
  color: grey;
}
</style>
