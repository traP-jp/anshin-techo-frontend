// 諸々の型定義
// 最新版はバックエンドの OpenAPI を参照する
// https://github.com/traP-jp/anshin-techo-backend/tree/main/docs/openapi

// prettier-ignore
export const UserRoleMap = {
  'manager'   : '渉外本職',
  'assistant' : '渉外補佐',
  'member'    : '一般部員',
 } as const

export const UserRoleList = Object.keys(UserRoleMap) as User['role'][]

// prettier-ignore
export const TicketStatusMap = {
  not_planned         : { icon: 'mdi-email-outline',        color: 'info',    label: '未対応' },
  not_written         : { icon: 'mdi-pencil',               color: 'info',    label: '返信中'  },
  waiting_review      : { icon: 'mdi-comment-text-outline', color: 'warning', label: 'レビュー待ち' },
  waiting_sent        : { icon: 'mdi-send-clock',           color: 'warning', label: '送信待ち' },
  sent                : { icon: 'mdi-send-check',           color: 'success', label: '送信済み' },
  milestone_scheduled : { icon: 'mdi-clock-outline',        color: 'error',   label: '予定待ち' },
  completed           : { icon: 'mdi-check',                color: 'grey',    label: '対応完了' },
  forgotten           : { icon: 'mdi-package-down',         color: 'grey' ,   label: '進展なし' },
} as const

export const TicketStatusList = Object.keys(TicketStatusMap) as Ticket['status'][]

// prettier-ignore
export const NoteTypeMap = {
  'outgoing' : '送信ノート',
  'incoming' : '受信ノート',
  'other'    : 'その他ノート',
} as const

export const NoteTypeList = Object.keys(NoteTypeMap) as Note['type'][]

// prettier-ignore
export const NoteStatusMap = {
  draft          : { icon: 'mdi-pencil', color: 'blue',   text: '執筆中' },
  waiting_review : { icon: 'mdi-loupe',  color: 'green',  text: 'レビュー待ち' },
  waiting_sent   : { icon: 'mdi-send',   color: 'orange', text: '送信待ち' },
  canceled       : { icon: 'mdi-close',  color: 'red',    text: 'キャンセル済み' },
  sent           : { icon: '',           color: '',       text: '' },
  // incoming と other において、status は sent で固定される
} as const

export const NoteStatusList = Object.keys(NoteStatusMap) as Note['status'][]

// prettier-ignore
export const ReviewTypeMap = {
  approval       : '承認',
  change_request : '修正依頼',
  comment        : 'コメント',
} as const

export const ReviewTypeList = Object.keys(ReviewTypeMap) as Review['type'][]

declare global {
  type User = {
    traq_id: string
    role: keyof typeof UserRoleMap
  }

  type PostTicket = {
    title: string
    description: string
    status: keyof typeof TicketStatusMap
    assignee: string
    sub_assignees: string[]
    stakeholders: string[]
    // client: string 実装しない
    due: string | null
    tags: string[]
  }

  type Ticket = PostTicket & {
    id: number
    created_at: string // ISO
    updated_at: string // ISO
  }

  type PostNote = {
    type: keyof typeof NoteTypeMap
    status: keyof typeof NoteStatusMap
    content: string // censorable
  }

  type Note = PostNote & {
    id: number
    ticket_id: number
    author: string
    reviews: Review[]
    created_at: string
  }

  type PostReview = {
    type: keyof typeof ReviewTypeMap
    weight?: number
    comment?: string
  }

  type Review = PostReview & {
    id: number
    note_id: number
    reviewer: string
    created_at: string // ISO
  }
}
