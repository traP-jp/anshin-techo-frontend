import { z } from 'zod'
import {
  USER_ROLES,
  TICKET_STATUSES,
  NOTE_TYPES,
  NOTE_STATUSES,
  REVIEW_TYPES,
  REVIEW_STATUSES,
} from './constants'

// --- Users ---

export const UserSchema = z.object({
  traq_id: z.string(),
  role: z.enum(USER_ROLES),
})

declare global {
  type User = z.infer<typeof UserSchema>
}

// --- Reviews ---

export const ReviewSchema = z.object({
  id: z.number(),
  note_id: z.number(),
  reviewer: z.string(),
  type: z.enum(REVIEW_TYPES),
  weight: z.number(),
  status: z.enum(REVIEW_STATUSES),
  comment: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
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

export const NoteSchema = z.object({
  id: z.number(),
  ticket_id: z.number(),
  type: z.enum(NOTE_TYPES),
  status: z.enum(NOTE_STATUSES),
  author: z.string(),
  content: z.string(),
  reviews: z.array(ReviewSchema),
  created_at: z.string(),
  updated_at: z.string(),
})

export const CreateNoteBodySchema = z.object({
  type: z.enum(NOTE_TYPES),
  content: z.string(),
  mention_notification: z.boolean(),
})

export const UpdateNoteBodySchema = z.object({
  content: z.string(),
  status: z.enum(NOTE_STATUSES),
  reset_reviews: z.boolean(),
})

declare global {
  type Note = z.infer<typeof NoteSchema>
}
export type CreateNoteBody = z.infer<typeof CreateNoteBodySchema>
export type UpdateNoteBody = z.infer<typeof UpdateNoteBodySchema>

// --- Tickets ---

export const TicketSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(TICKET_STATUSES),
  assignee: z.string(),
  sub_assignees: z.array(z.string()),
  stakeholders: z.array(z.string()),
  due: z.string().nullable(),
  tags: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
})

export const CreateTicketBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(TICKET_STATUSES),
  assignee: z.string(),
  sub_assignees: z.array(z.string()),
  stakeholders: z.array(z.string()),
  due: z.string().nullable(),
  tags: z.array(z.string()),
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
