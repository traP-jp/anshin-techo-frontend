// 諸々の型定義
// 最新版はバックエンドの OpenAPI を参照する
// https://github.com/traP-jp/anshin-techo-backend/tree/main/docs/openapi

type User = {
  traq_id: string

  // prettier-ignore
  role: (
    | 'manager'   // 渉外本職
    | 'assistant' // 渉外補佐
    | 'member'    // 一般部員
  )
}

type Ticket = {
  id: number

  // prettier-ignore
  status: (
    | 'not_planned'          // 方針決定待ち
    | 'not_written'          // メールが書かれていない
    | 'waiting_review'       // レビュー待ち
    | 'waiting_sent'         // レビュー済み
    | 'sent'                 // 送信済み。相手の対応待ち
    | 'milestone_scheduled'  // 次のアクション決定済み
    | 'completed'            // 完了
    | 'forgotten'            // 放置
  )

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

type Note = {
  id: number
  ticket_id: number

  type: 'outgoing' | 'incoming' | 'other'

  // prettier-ignore
  status: (
    | 'draft'          // 下書き
    | 'waiting_review' // 添削待ち
    | 'waiting_sent'   // 承認完了・送信待ち
    | 'sent'           // 送信済み
    | 'canceled'       // 破棄
  ) // incoming と other において、status は sent で固定される

  author: string
  content: string // censorable

  reviews: Review[]
  // review_assignees は消滅

  created_at: string
}

type Review = {
  id: number
  note_id: number
  reviewer: string

  type: 'approval' | 'change_request' | 'comment'
  weight: number // 0 以上 5 以下の整数
  comment: string // censorable
  created_at: string // ISO
}
