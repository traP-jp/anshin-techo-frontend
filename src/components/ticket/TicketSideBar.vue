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
    <div class="d-flex flex-column">
      <!-- ヘッダー -->
      <h3 :class="$style.title">チケット詳細</h3>

      <p class="text-grey-darken-2" :class="$style.id">ID : {{ ticket.id }}</p>
      <p class="text-grey-darken-2" :class="$style.createdAt">
        作成日時 : {{ getDateRepresentation(ticket.created_at) }}
      </p>
      <div class="d-flex flex-column ga-4 ml-5 mr-4 mt-2">
        <!-- タイトル -->
        <v-text-field
          :model-value="ticket.title"
          label="タイトル"
          variant="outlined"
          density="compact"
          hide-details
          readonly
        />

        <!-- 担当者 -->
        <!-- 主担当 -->
        <v-text-field
          :model-value="ticket.assignee"
          label="主担当"
          variant="outlined"
          density="compact"
          hide-details
          readonly
        >
          <template #append-inner>
            <div class="d-flex align-center ga-1">
              <user-icon :id="ticket.assignee" :size="20" />
              <v-icon color="grey-darken-1" icon="mdi-menu-down" size="20" />
            </div>
          </template>
        </v-text-field>

        <v-text-field
          :model-value="ticket.sub_assignees.join(', ')"
          label="副担当"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-menu-down"
          hide-details
          readonly
        />

        <!-- 関係者 -->
        <v-text-field
          :model-value="ticket.stakeholders.join(', ')"
          label="関係者"
          variant="outlined"
          density="compact"
          append-inner-icon="mdi-menu-down"
          hide-details
          readonly
        />

        <!-- 期日 -->
        <div class="d-flex flex-column">
          <v-text-field
            :model-value="formattedDue"
            label="期日"
            variant="outlined"
            density="compact"
            hide-details
            readonly
          >
            <template #append>
              <v-icon icon="mdi-calendar" size="28" />
            </template>
          </v-text-field>
          <p class="text-grey-darken-2" :class="$style.reminder">
            次回はxx時間後にリマインドされます
          </p>
        </div>

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
          hide-details
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
          hide-details
        />

        <!-- 補足 -->
        <v-textarea
          :model-value="ticket.description"
          label="補足"
          variant="outlined"
          density="compact"
          rows="3"
          hide-details
          readonly
        />

        <!-- アクション -->
        <div class="d-flex justify-end">
          <v-btn :class="$style.button">CANCEL</v-btn>
          <v-btn :class="$style.button">OK</v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style module>
.title {
  width: 208px;
  height: 23px;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 10px;
}

.id {
  width: 136px;
  height: 19px;
  font-size: 12px;
  margin-left: 20px;
  margin-top: 9px;
}

.createdAt {
  width: 202px;
  height: 19px;
  font-size: 12px;
  margin-left: 20px;
}

.reminder {
  width: 206px;
  height: 15px;
  font-size: 12px;
}

.button {
  width: 54px;
  height: 21px;
  font-size: 12px;
}
</style>
