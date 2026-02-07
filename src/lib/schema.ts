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

export type User = z.infer<typeof UserSchema>

// --- Reviews ---

export const REVIEW_TYPES = ['approve', 'change_request', 'comment', 'system'] as const

export const REVIEW_STATUSES = ['active', 'stale'] as const

export const ReviewSchema = z.object({
  id: z.number().int(),
  note_id: z.number().int(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),

  reviewer: z.string(),
  type: z.enum(REVIEW_TYPES),
  weight: z.number().int(),
  status: z.enum(REVIEW_STATUSES),
  comment: z.string(),
})

export const PostReviewBodySchema = z.object({
  type: z.enum(REVIEW_TYPES),
  weight: z.number().int(),
  comment: z.string(),
})

export const PutReviewBodySchema = z.object({
  type: z.enum(REVIEW_TYPES),
  weight: z.number().int(),
  comment: z.string(),
})

export type Review = z.infer<typeof ReviewSchema>
export type PostReviewBody = z.infer<typeof PostReviewBodySchema>
export type PutReviewBody = z.infer<typeof PutReviewBodySchema>

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
  id: z.number().int(),
  ticket_id: z.number().int(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),

  author: z.string(),
  type: z.enum(NOTE_TYPES),
  status: z.enum(NOTE_STATUSES), // postNote の返り値で undefined になっている？
  content: z.string(),

  reviews: z.array(ReviewSchema),
})

export const PostNoteBodySchema = z.object({
  type: z.enum(NOTE_TYPES),
  content: z.string(),
  mention_notification: z.boolean(),
})

export const PutNoteBodySchema = z.object({
  status: z.enum(NOTE_STATUSES),
  content: z.string(),
  reset_reviews: z.boolean(),
})

export type Note = z.infer<typeof NoteSchema>
export type PostNoteBody = z.infer<typeof PostNoteBodySchema>
export type PutNoteBody = z.infer<typeof PutNoteBodySchema>

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
  id: z.number().int(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),

  assignee: z.string(),
  sub_assignees: z.array(z.string()),
  stakeholders: z.array(z.string()),

  title: z.string(),
  description: z.string(), // ステージング環境に undefned のチケットが存在する

  status: z.enum(TICKET_STATUSES),
  tags: z.array(z.string()),
  due: z.iso.date().nullable(),
})

export const PostTicketBodySchema = z.object({
  assignee: z.string(),
  sub_assignees: z.array(z.string()),
  stakeholders: z.array(z.string()),

  title: z.string(),
  description: z.string(),
  status: z.enum(TICKET_STATUSES),
  tags: z.array(z.string()),
  due: z.iso.date().nullable(),
})

export const TicketDetailSchema = TicketSchema.extend({
  notes: z.array(NoteSchema),
})

export const PatchTicketBodySchema = PostTicketBodySchema.partial()

export type Ticket = z.infer<typeof TicketSchema>
export type TicketDetail = z.infer<typeof TicketDetailSchema>
export type PostTicketBody = z.infer<typeof PostTicketBodySchema>
export type PatchTicketBody = z.infer<typeof PatchTicketBodySchema>

// --- Config ---

export const ConfigSchema = z.object({
  reminder_interval: z.object({
    overdue_day: z.array(z.number().int()),
    notesent_hour: z.number().int(),
  }),
  revise_prompt: z.string(),
})

export type Config = z.infer<typeof ConfigSchema>

// --- Common Responses ---

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
})

export const ErrorSchema = z.object({
  message: z.string(),
})

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>
export type ErrorResponse = z.infer<typeof ErrorSchema>
