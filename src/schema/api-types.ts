/**
 * API型定義
 * OpenAPI Specification v1.0.0 から生成
 */

// =====================================
// Enums
// =====================================

/**
 * チケットの進行状況
 */
export type TicketStatus =
  | 'not_planned' // 方針決定待ち
  | 'not_written' // メールが書かれていない
  | 'waiting_review' // レビューを待っている
  | 'waiting_sent' // レビューが終わっている
  | 'sent' // 相手の対応待ち (送信済み)
  | 'milestone_scheduled' // 次のアクション決定済み
  | 'completed' // 完了
  | 'forgotten' // 忘れ去られた状態

/**
 * ノートの種類
 */
export type NoteType = 'outgoing' | 'incoming' | 'other'

/**
 * Outgoing(発信)ノートの状態管理用
 */
export type NoteStatus =
  | 'draft' // 下書き
  | 'waiting_review' // 添削待ち
  | 'waiting_sent' // 承認完了・送信待ち (Weight >= 5)
  | 'sent' // 送信済み (手動完了)
  | 'canceled' // 破棄

/**
 * レビューの種類
 */
export type ReviewType = 'approve' | 'change_request' | 'comment' | 'system'

/**
 * ユーザーの役割
 */
export type UserRole = 'manager' | 'assistant' | 'member'

/**
 * レビュー状態
 */
export type ReviewStatus = 'active' | 'stale'

/**
 * チケットソート順
 */
export type TicketSortOrder = 'due_asc' | 'due_desc' | 'created_desc'

// =====================================
// Models
// =====================================

/**
 * ユーザー
 */
export interface User {
  /** traQ ID (例: ramdos) */
  traq_id: string
  /** ユーザーの役割 (manager: 本職, assistant: 補佐, member: その他) */
  role: UserRole
}

/**
 * チケット（案件）
 */
export interface Ticket {
  /** チケットID */
  id: number
  /** 案件名 */
  title: string
  /** 詳細 */
  description?: string
  /** 主担当のtraQ ID */
  assignee: string
  /** 副担当リスト (traQ ID) */
  sub_assignees?: string[]
  /** その他関係者リスト (traQ ID) */
  stakeholders?: string[]
  /** チケットの進行状況 */
  status: TicketStatus
  /** タグ (例: 協賛, 問い合わせ) */
  tags?: string[]
  /** 期日。未指定時は自動設定される */
  due?: string | null
  /** 作成日時 */
  created_at: string
  /** 更新日時 */
  updated_at?: string
}

/**
 * チケット詳細（ノート一覧含む）
 */
export interface TicketDetail extends Ticket {
  /** このチケットに紐づくノート一覧 */
  notes?: Note[]
}

/**
 * ノート（メール/メッセージ）
 */
export interface Note {
  /** ノートID */
  id: number
  /** 所属チケットID */
  ticket_id: number
  /** ノートの種類 */
  type: NoteType
  /** ノートの状態 */
  status?: NoteStatus
  /** 作成者のtraQ ID */
  author: string
  /** メッセージ本文 */
  content: string
  /** レビュー一覧 */
  reviews?: Review[]
  /** 作成日時 */
  created_at?: string
  /** 更新日時 */
  updated_at?: string
}

/**
 * レビュー
 */
export interface Review {
  /** レビューID */
  id: number
  /** レビュー対象のノートID */
  note_id: number
  /** レビュワーのtraQ ID */
  reviewer: string
  /** レビューの種類 */
  type: ReviewType
  /**
   * 承認ウェイト
   * - 本職: 1-5
   * - 補佐: 1-4
   * - その他: 0
   */
  weight: number
  /** レビュー状態 (active: 有効, stale: 修正により無効化済み) */
  status: ReviewStatus
  /** コメント */
  comment?: string
  /** 作成日時 */
  created_at?: string
  /** 更新日時 */
  updated_at?: string
}

/**
 * システム設定
 */
export interface Config {
  /** リマインドのタイミング設定 */
  reminder_interval: {
    /** 期限超過後にリマインドする日数のリスト */
    overdue_day: number[]
    /** 送信予定からリマインドするまでの時間(時間単位) */
    notesent_hour: number
  }
  /** レビュアーに渡すリビジョン指示テキスト */
  revise_prompt: string
}

/**
 * エラーレスポンス
 */
export interface ErrorResponse {
  /** エラーメッセージ */
  message: string
}

// =====================================
// Request Bodies
// =====================================

/**
 * チケット作成リクエスト
 */
export interface CreateTicketRequest {
  /** 案件名 */
  title: string
  /** 詳細 */
  description?: string
  /** チケットの進行状況 */
  status: TicketStatus
  /** 主担当 (traQ ID) */
  assignee: string
  /** 副担当リスト (traQ ID) */
  sub_assignees?: string[]
  /** その他関係者 (traQ ID) */
  stakeholders?: string[]
  /** 期日 */
  due?: string
  /** タグ */
  tags?: string[]
}

/**
 * チケット更新リクエスト
 */
export interface UpdateTicketRequest {
  /** 案件名 */
  title?: string
  /** 詳細 */
  description?: string
  /** チケットの進行状況 */
  status?: TicketStatus
  /** 主担当のtraQ ID */
  assignee?: string
  /** 副担当リスト */
  sub_assignees?: string[]
  /** その他関係者リスト */
  stakeholders?: string[]
  /** 期日 */
  due?: string
  /** タグ */
  tags?: string[]
}

/**
 * ノート作成リクエスト
 */
export interface CreateNoteRequest {
  /** ノートの種類 */
  type: NoteType
  /** メッセージ本文 */
  content: string
  /** 作成時にメンション通知を送るか否か */
  mention_notification: boolean
}

/**
 * ノート編集リクエスト
 */
export interface UpdateNoteRequest {
  /** メッセージ本文 */
  content?: string
  /** ノートの状態 */
  status?: NoteStatus
  /** trueの場合、承認状況(Weight)をリセットしてDraftに戻す */
  reset_reviews?: boolean
}

/**
 * レビュー追加リクエスト
 */
export interface CreateReviewRequest {
  /** レビューの種類 */
  type: ReviewType
  /** 承認の強さ */
  weight?: number
  /** コメント */
  comment?: string
}

/**
 * レビュー修正リクエスト
 */
export interface UpdateReviewRequest {
  /** レビューの種類 */
  type?: ReviewType
  /** 承認の強さ */
  weight?: number
  /** コメント */
  comment?: string
}

/**
 * AI生成リクエスト
 */
export interface AIGenerateRequest {
  /** ユーザーからの追加指示 */
  instruction?: string
}

// =====================================
// Query Parameters
// =====================================

/**
 * チケット一覧取得のクエリパラメータ
 */
export interface GetTicketsQuery {
  /** 担当者IDでフィルタ */
  assignee?: string
  /** ステータスでフィルタ */
  status?: TicketStatus
  /** ソート順 */
  sort?: TicketSortOrder
}

// =====================================
// Special Responses
// =====================================

/**
 * 現在のユーザー情報
 */
export interface MeResponse {
  /** traQ ID */
  id: string
}
