<script setup lang="ts">
import { computed } from 'vue'
import UserIcon from '@/components/shared/UserIcon.vue'
import { getDateRepresentation } from '@/utils/date'
const props = defineProps<{ ticket: Ticket }>()

const formattedDue = computed(() => {
  if (!props.ticket.due) return '未設定'

  const date = new Date(props.ticket.due)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
})
</script>

<template>
  <v-navigation-drawer permanent width="300">
    <div :class="$style.sidebar">
      <!-- ヘッダー -->
      <h3 :class="$style.title">チケット詳細</h3>

      <p :class="$style.id">ID : {{ ticket.id }}</p>
      <p :class="$style.createdAt">作成日時 : {{ getDateRepresentation(ticket.created_at) }}</p>
      <div :class="$style.container">
        <!-- タイトル -->
        <v-text-field
          :model-value="ticket.title"
          label="タイトル"
          variant="outlined"
          density="compact"
          readonly
        />

        <!-- 担当者 -->
        <!-- 主担当 -->
        <v-text-field
          :model-value="ticket.assignee"
          label="主担当"
          variant="outlined"
          density="compact"
          readonly
        >
          <template #append-inner>
            <div :class="$style.assigneeAppend">
              <user-icon :id="ticket.assignee" :size="20" />
              <v-icon icon="mdi-menu-down" size="20" :class="$style.dropdownIcon" />
            </div>
          </template>
        </v-text-field>

        <v-text-field
          :model-value="ticket.sub_assignees.join(', ')"
          label="副担当"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-menu-down"
          readonly
        />

        <!-- 関係者 -->
        <v-text-field
          :model-value="ticket.stakeholders.join(', ')"
          label="関係者"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-menu-down"
          readonly
        />

        <!-- 期日 -->
        <v-text-field
          :model-value="formattedDue"
          label="期日"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-menu-down"
          append-icon="mdi-calendar"
        />

        <!-- ステータス -->
        <v-select
          :model-value="ticket.status"
          label="チケットステータス"
          :items="[
            'not_planned',
            'not_written',
            'waiting_review',
            'waiting_sent',
            'sent',
            'milestone_scheduled',
            'completed',
            'forgotten',
          ]"
          variant="outlined"
          density="compact"
          readonly
        />

        <!-- タグ -->
        <v-combobox
          :model-value="ticket.tags"
          label="タグ"
          multiple
          chips
          closable-chips
          variant="outlined"
          density="compact"
          readonly
        />

        <!-- 補足 -->
        <v-textarea
          :model-value="ticket.description"
          label="補足"
          variant="outlined"
          density="compact"
          rows="3"
          readonly
        />

        <!-- アクション -->
        <div :class="$style.actions">
          <v-btn variant="text">CANCEL</v-btn>
          <v-btn color="primary">OK</v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style module>
.sidebar {
  display: flex;
  flex-direction: column;
}

.title {
  width: 208px;
  height: 23px;
  margin-left: 20px;
  margin-top: 10px;
}

.id {
  width: 136px;
  height: 19px;
  margin-left: 20px;
  margin-top: 9px;
}

.createdAt {
  width: 202px;
  height: 19px;
  margin-left: 20px;
}
.meta {
  font-size: 12px;
  color: #666;
}

.container {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 16px;
  margin-top: 9px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.assigneeAppend {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dropdownIcon {
  color: #666;
}

.label {
  font-size: 12px;
  color: #666;
}

.userList {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.userRow {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
}

.userName {
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.dueRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.calendarIcon {
  color: #666;
  cursor: pointer;
  width: 28px;
  height: 28px;
}
</style>
