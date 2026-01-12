// API スキーマ定義。フィールドの記述順は概ね以下に従う
// 1. 手動で変更不可能なもの（id, created_at, updated_at など）
// 2. そのオブジェクトの作成・編集の主体に関するもの（author, reviewer など）
// 3. その他のフィールド

import { z } from 'zod'

// --- Users ---

export const USER_ROLES = ['manager', 'assistant', 'member'] as const

export const UserSchema = z.object({
  traq_id: z.string(),
  role: z.enum(USER_ROLES),
})

declare global {
  type User = z.infer<typeof UserSchema>
}

// --- Reviews ---

export const REVIEW_TYPES = ['approve', 'change_request', 'comment', 'system'] as const

export const REVIEW_STATUSES = ['active', 'stale'] as const

export const ReviewSchema = z.object({
  id: z.number(),
  note_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),

  reviewer: z.string(),
  type: z.enum(REVIEW_TYPES),
  weight: z.number(),
  status: z.enum(REVIEW_STATUSES),
  comment: z.string().optional(),
})

export const CreateReviewBodySchema = z.object({
  type: z.enum(REVIEW_TYPES),
  weight: z.number().optional(),
  comment: z.string().optional(),
})

export const UpdateReviewBodySchema = z.object({
  type: z.enum(REVIEW_TYPES).optional(),
  weight: z.number().optional(),
  comment: z.string().optional(),
})

declare global {
  type Review = z.infer<typeof ReviewSchema>
}
export type CreateReviewBody = z.infer<typeof CreateReviewBodySchema>
export type UpdateReviewBody = z.infer<typeof UpdateReviewBodySchema>

// --- Notes ---

export const NOTE_TYPES = ['outgoing', 'incoming', 'other'] as const

export const NOTE_STATUSES = [
  'draft',
  'waiting_review',
  'waiting_sent',
  'sent',
  'canceled',
] as const

export const NoteSchema = z.object({
  id: z.number(),
  ticket_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),

  author: z.string(),
  type: z.enum(NOTE_TYPES),
  status: z.enum(NOTE_STATUSES),
  content: z.string(),

  reviews: z.array(ReviewSchema),
})

export const CreateNoteBodySchema = z.object({
  type: z.enum(NOTE_TYPES),
  content: z.string(),
  mention_notification: z.boolean(),
})

export const UpdateNoteBodySchema = z.object({
  status: z.enum(NOTE_STATUSES),
  content: z.string(),
  reset_reviews: z.boolean(),
})

declare global {
  type Note = z.infer<typeof NoteSchema>
}
export type CreateNoteBody = z.infer<typeof CreateNoteBodySchema>
export type UpdateNoteBody = z.infer<typeof UpdateNoteBodySchema>

// --- Tickets ---

export const TICKET_STATUSES = [
  'not_planned',
  'not_written',
  'waiting_review',
  'waiting_sent',
  'sent',
  'milestone_scheduled',
  'completed',
  'forgotten',
] as const

export const TicketSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),

  assignee: z.string(),
  sub_assignees: z.array(z.string()),
  stakeholders: z.array(z.string()),

  title: z.string(),
  description: z.string(),
  status: z.enum(TICKET_STATUSES),
  tags: z.array(z.string()),
  due: z.string().optional(),
})

export const CreateTicketBodySchema = z.object({
  assignee: z.string(),
  sub_assignees: z.array(z.string()),
  stakeholders: z.array(z.string()),

  title: z.string(),
  description: z.string(),
  status: z.enum(TICKET_STATUSES),
  tags: z.array(z.string()),
  due: z.string().optional(),
})

export const TicketDetailSchema = TicketSchema.extend({
  notes: z.array(NoteSchema),
})

declare global {
  type Ticket = z.infer<typeof TicketSchema>
  type TicketDetail = z.infer<typeof TicketDetailSchema>
}
export type CreateTicketBody = z.infer<typeof CreateTicketBodySchema>

// --- Config ---

export const ConfigSchema = z.object({
  reminder_interval: z.object({
    overdue_day: z.array(z.number()),
    notesent_hour: z.number(),
  }),
  revise_prompt: z.string(),
})

// --- Common Responses ---

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
})
