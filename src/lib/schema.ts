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
  updated_at: z.string().optional(),
})
declare global {
  type Review = z.infer<typeof ReviewSchema>
}

export const CreateReviewBodySchema = z.object({
  type: z.enum(REVIEW_TYPES),
  weight: z.number().optional(),
  comment: z.string().optional(),
})
export type CreateReviewBody = z.infer<typeof CreateReviewBodySchema>

export const UpdateReviewBodySchema = z.object({
  type: z.enum(REVIEW_TYPES).optional(),
  weight: z.number().optional(),
  comment: z.string().optional(),
})
export type UpdateReviewBody = z.infer<typeof CreateReviewBodySchema>

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
  updated_at: z.string().optional(),
})
declare global {
  type Note = z.infer<typeof NoteSchema>
}

export const CreateNoteBodySchema = z.object({
  type: z.enum(NOTE_TYPES),
  content: z.string(),
  mention_notification: z.boolean(),
})
export type CreateNoteBody = z.infer<typeof CreateNoteBodySchema>

export const UpdateNoteBodySchema = z.object({
  content: z.string().optional(),
  status: z.enum(NOTE_STATUSES).optional(),
  reset_reviews: z.boolean().optional(),
})
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
declare global {
  type Ticket = z.infer<typeof TicketSchema>
}

export const CreateTicketBodySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(TICKET_STATUSES),
  assignee: z.string(),
  sub_assignees: z.array(z.string()).optional(),
  stakeholders: z.array(z.string()).optional(),
  due: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
})
export type CreateTicketBody = z.infer<typeof CreateTicketBodySchema>

export const TicketDetailSchema = TicketSchema.extend({
  notes: z.array(NoteSchema),
})
declare global {
  type TicketDetail = z.infer<typeof TicketDetailSchema>
}

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
