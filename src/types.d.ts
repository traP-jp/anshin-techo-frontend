// 諸々の型定義
// 最新版はバックエンドの openapi.yaml を参照する

type Ticket = {
  id: number
  assignee: string
  sub_assignees: string[] // 複数形は s をつけた方がよさそう
  stakeholders: string[]

  due: string | null // ISO 形式
  // nullable なのは「たまたま」手動で設定した期限が自動で設定される期限に一致したとき、それらを見分けるため

  status: 'not_planned' | 'writing' | 'sent' | 'milestone_scheduled' | 'completed' | 'forgotten'
  // writing の中でも 下書き執筆中、レビュー待ち、送信待ち という細かい状態がある
  // 結局 /tickets API に最新の下書きノートの status が付属するかどうかはよくわからない

  title: string // title が censorable だとチケット一覧のページにまで伏字が侵食してきて困りそう
  description: string // censorable
  // description どこで使うんだろ。other ノートで果たせない役割があるのかしら

  tag: string[]
  created_at: string
  updated_at: string
  deleted_at: string | null // 不要？ 消されたならそもそもレスポンスに含まれなくていい気もする

  // 追記
  client: string // 相手先の会社名

  notes: Note[]
}

type Note = {
  id: number
  type: 'outgoing' | 'incoming' | 'other'
  status: 'draft' | 'waiting_review' | 'waiting_sent' | 'sent' | 'canceled'
  // incoming と other においては sent 固定で、この値にとくに意味がない

  author: string
  content: string // censorable
  created_at: string
  updated_at: string
  deleted_at: string | null // 不要？

  review_assignees: string[]
  reviews: Review[]
}

type Review = {
  id: number
  type: 'approval' | 'correction' | 'comment'
  // え、知らないうちに comment が可能になってる
  // API 定義の方が古いのか…？

  status: 'active' | 'stale'
  // stale とは下書きの更新によって無効になったレビュー

  author: string
  weight: number
  comment: string // censorable

  created_at: string
  updated_at: string
  deleted_at: string | null // 不要？
}
