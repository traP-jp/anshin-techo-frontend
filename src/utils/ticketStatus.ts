export const statusMap: Record<string, { label: string; icon: string; color: string }> = {
  not_planned: { label: '未対応', icon: 'mdi-email-outline', color: 'info' },
  not_written: { label: '未対応', icon: 'mdi-email-outline', color: 'info' },
  waiting_review: { label: 'レビュー待ち', icon: 'mdi-pencil', color: 'warning' },
  waiting_sent: { label: '送信待ち', icon: 'mdi-email-arrow-right', color: 'warning' },
  sent: { label: '送信済み', icon: 'mdi-send', color: 'success' },
  milestone_scheduled: { label: '予定待ち', icon: 'mdi-clock-outline', color: 'error' },
  completed: { label: '対応完了', icon: 'mdi-check', color: 'grey' },
  forgotten: { label: '進展なし', icon: 'mdi-calendar-remove', color: 'grey' },
}
