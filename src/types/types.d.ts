// 最新版はバックエンドの OpenAPI を参照する
// https://github.com/traP-jp/anshin-techo-backend/tree/main/docs/openapi

// User

type User = {
  traq_id: string
  role: (typeof import('./constants').USER_ROLES)[number]
}

// Ticket

type Ticket = {
  id: number
  title: string
  description: string
  status: (typeof import('./constants').TICKET_STATUSES)[number]
  assignee: string
  sub_assignees: string[]
  stakeholders: string[]
  due: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

type CreateTicketBody = {
  title: string
  description?: string
  status: Ticket['status']
  assignee: string
  sub_assignees?: string[]
  stakeholders?: string[]
  due?: string | null
  tags?: string[]
}

type UpdateTicketBody = Partial<CreateTicketBody>

// Note

type Note = {
  id: number
  ticket_id: number
  type: (typeof import('./constants').NOTE_TYPES)[number]
  status: (typeof import('./constants').NOTE_STATUSES)[number]
  author: string
  content: string
  reviews: Review[]
  created_at: string
  updated_at?: string
}

type CreateNoteBody = {
  type: Note['type']
  content: string
  mention_notification: boolean
}

type UpdateNoteBody = {
  content?: string
  status?: Note['status']
  reset_reviews?: boolean
}

// Review

type Review = {
  id: number
  note_id: number
  reviewer: string
  type: (typeof import('./constants').REVIEW_TYPES)[number]
  weight: number
  status: (typeof import('./constants').REVIEW_STATUSES)[number]
  comment?: string
  created_at: string
  updated_at?: string
}

type CreateReviewBody = {
  type: Review['type']
  weight?: number
  comment?: string
}

type UpdateReviewBody = {
  type?: Review['type']
  weight?: number
  comment?: string
}

// GenAI

type GenerateAiDraftBody = {
  instruction?: string
}
