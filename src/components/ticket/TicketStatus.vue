<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ ticketStatus: Ticket['status'] }>()

// prettier-ignore
const statusMap = {
  not_planned:         { icon: 'mdi-email-outline',        color: 'info',    label: '未対応', },
  not_written:         { icon: 'mdi-pencil',               color: 'info',    label: '返信中',  },
  waiting_review:      { icon: 'mdi-comment-text-outline', color: 'warning', label: 'レビュー待ち', },
  waiting_sent:        { icon: 'mdi-send-clock',           color: 'warning', label: '送信待ち', },
  sent:                { icon: 'mdi-send-check',           color: 'success', label: '送信済み', },
  milestone_scheduled: { icon: 'mdi-clock-outline',        color: 'error',   label: '予定待ち', },
  completed:           { icon: 'mdi-check',                color: 'grey',    label: '対応完了', },
  forgotten:           { icon: 'mdi-package-down',         color: 'grey' ,   label: '進展なし', },
}

const repr = computed(() => statusMap[props.ticketStatus])
</script>

<template>
  <div class="d-flex align-center">
    <v-icon :color="repr.color" size="large" class="mr-1">
      {{ repr.icon }}
    </v-icon>
    <span :class="`text-${repr.color} font-weight-medium`">
      {{ repr.label ?? ticketStatus }}
    </span>
  </div>
</template>
