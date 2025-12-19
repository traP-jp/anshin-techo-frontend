// 諸々の型定義
// 最新版はバックエンドの OpenAPI を参照する
// https://github.com/traP-jp/anshin-techo-backend/tree/main/docs/openapi

// prettier-ignore
const UserRoleList = [
  'manager',   // 渉外本職
  'assistant', // 渉外補佐
  'member',    // 一般部員
] as const

type User = {
  traq_id: string
  role: (typeof UserRoleList)[number]
}

// prettier-ignore
const TicketStatusList = [
  'not_planned',          // 方針決定待ち
  'not_written',          // メールが書かれていない
  'waiting_review',       // レビュー待ち
  'waiting_sent',         // レビュー済み
  'sent',                 // 送信済み。相手の対応待ち
  'milestone_scheduled',  // 次のアクション決定済み
  'completed',            // 完了
  'forgotten',            // 放置
] as const

type Ticket = {
  id: number
  status: (typeof TicketStatusList)[number]

  title: string // censorable
  description: string // censorable

  assignee: string
  sub_assignees: string[]
  stakeholders: string[]

  tags: string[]

  due: string | null // リマインドの手動・自動を見分けるため nullable
  created_at: string // ISO
  updated_at: string // ISO

  client: string // 相手先の会社名
}

const NoteTypeList = ['outgoing', 'incoming', 'other'] as const

// prettier-ignore
const NoteStatusList = [
  'draft',          // 下書き
  'waiting_review', // 添削待ち
  'waiting_sent',   // 承認完了・送信待ち
  'sent',           // 送信済み
  'canceled',       // 破棄
  // incoming と other において、status は sent で固定される
] as const

type Note = {
  id: number
  ticket_id: number
  type: (typeof NoteTypeList)[number]
  status: (typeof NoteStatusList)[number]

  author: string
  content: string // censorable

  reviews: Review[]
  // review_assignees は消滅

  created_at: string
}

const ReviewTypeList = ['approval', 'change_request', 'comment'] as const

type Review = {
  id: number
  note_id: number
  reviewer: string

  type: (typeof ReviewTypeList)[number]
  weight: number // 0 以上 5 以下の整数
  comment: string // censorable
  created_at: string // ISO
}
