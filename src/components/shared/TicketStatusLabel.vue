<script setup lang="ts">
const statusMap: Record<string, { label: string; icon: string; color: string }> = {
  not_planned: { label: '未対応', icon: 'mdi-email-outline', color: 'info' },
  not_written: { label: '返信中', icon: 'mdi-pencil', color: 'info' },
  waiting_review: { label: 'レビュー待ち', icon: 'mdi-comment-text-outline', color: 'warning' },
  waiting_sent: { label: '送信待ち', icon: 'mdi-send-clock', color: 'warning' },
  sent: { label: '送信済み', icon: 'mdi-send-check', color: 'success' },
  milestone_scheduled: { label: '予定待ち', icon: 'mdi-clock-outline', color: 'error' },
  completed: { label: '対応完了', icon: 'mdi-check', color: 'grey' },
  forgotten: { label: '進展なし', icon: 'mdi-package-down', color: 'grey' },
}

defineProps<{
  status: string
}>()
</script>

<template>
  <div class="d-flex align-center">
    <v-icon :color="statusMap[status]?.color" size="large" class="mr-1">
      {{ statusMap[status]?.icon }}
    </v-icon>
    <span :class="`text-${statusMap[status]?.color}`">
      {{ statusMap[status]?.label ?? status }}
    </span>
  </div>
</template>
