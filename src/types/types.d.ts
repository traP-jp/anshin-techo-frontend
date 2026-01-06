// 最新版はバックエンドの OpenAPI を参照する
// https://github.com/traP-jp/anshin-techo-backend/tree/main/docs/openapi

// User

type UserRole = (typeof import('./constants').USER_ROLES)[number]

type User = {
  traq_id: string
  role: UserRole
}

// Ticket

type TicketStatus = (typeof import('./constants').TICKET_STATUSES)[number]

type Ticket = {
  id: number
  title: string
  description?: string
  status: TicketStatus
  assignee: string
  sub_assignees?: string[]
  stakeholders?: string[]
  due?: string | null
  tags?: string[]
  created_at: string
  updated_at?: string
}

type CreateTicketBody = {
  title: string
  description?: string
  status: TicketStatus
  assignee: string
  sub_assignees?: string[]
  stakeholders?: string[]
  due?: string | null
  tags?: string[]
}

type UpdateTicketBody = Partial<CreateTicketBody>

// Note

type NoteType = (typeof import('./constants').NOTE_TYPES)[number]
type NoteStatus = (typeof import('./constants').NOTE_STATUSES)[number]

type Note = {
  id: number
  ticket_id: number
  type: NoteType
  status?: NoteStatus
  author: string
  content: string
  reviews?: Review[]
  created_at: string
  updated_at?: string
}

type CreateNoteBody = {
  type: NoteType
  content: string
  mention_notification: boolean
}

type UpdateNoteBody = {
  content?: string
  status?: NoteStatus
  reset_reviews?: boolean
}

// Review

type ReviewType = (typeof import('./constants').REVIEW_TYPES)[number]
type ReviewStatus = (typeof import('./constants').REVIEW_STATUSES)[number]

type Review = {
  id: number
  note_id: number
  reviewer: string
  type: ReviewType
  weight: number
  status: ReviewStatus
  comment?: string
  created_at: string
  updated_at?: string
}

type CreateReviewBody = {
  type: ReviewType
  weight?: number
  comment?: string
}

type UpdateReviewBody = {
  type?: ReviewType
  weight?: number
  comment?: string
}

// GenAI

type GenerateAiDraftBody = {
  instruction?: string
}
