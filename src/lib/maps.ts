import type { Ticket, Note } from './schema'

// prettier-ignore
export const UserRoleMap = {
  'manager'   : '渉外本職',
  'assistant' : '渉外補佐',
  'member'    : '一般部員',
}

// prettier-ignore
export const NoteTypeMap = {
  'outgoing' : '送信ノート',
  'incoming' : '受信ノート',
  'other'    : 'その他ノート',
}

// prettier-ignore
export const ReviewTypeMap = {
  approve       : '承認',
  change_request : '修正依頼',
  comment        : 'コメント',
  // system に対応する文字列は UI に表示しない
} as const

type TicketStatusInfo = { icon: string; color: string; label: string }

// prettier-ignore
export const TicketStatusMap: Record<Ticket['status'], TicketStatusInfo> = {
  not_planned         : { icon: 'mdi-email-outline',        color: 'info',    label: '未対応' },
  not_written         : { icon: 'mdi-pencil',               color: 'info',    label: '返信中'  },
  waiting_review      : { icon: 'mdi-comment-text-outline', color: 'warning', label: 'レビュー待ち' },
  waiting_sent        : { icon: 'mdi-send-clock',           color: 'warning', label: '送信待ち' },
  sent                : { icon: 'mdi-send-check',           color: 'success', label: '送信済み' },
  milestone_scheduled : { icon: 'mdi-clock-outline',        color: 'error',   label: '予定待ち' },
  completed           : { icon: 'mdi-check',                color: 'grey',    label: '対応完了' },
  forgotten           : { icon: 'mdi-package-down',         color: 'grey' ,   label: '進展なし' },
} as const

type NoteStatusInfo = { icon: string; color: string; label: string }

// prettier-ignore
export const NoteStatusMap: Partial<Record<Note['status'], NoteStatusInfo>> = {
  draft          : { icon: 'mdi-pencil', color: 'blue',   label: '執筆中' },
  waiting_review : { icon: 'mdi-loupe',  color: 'green',  label: 'レビュー待ち' },
  waiting_sent   : { icon: 'mdi-send',   color: 'orange', label: '送信待ち' },
  canceled       : { icon: 'mdi-close',  color: 'red',    label: 'キャンセル済み' },
  // incoming と other において、status は sent で固定される
} as const
