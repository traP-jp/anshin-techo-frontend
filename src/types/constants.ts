export const USER_ROLES = ['manager', 'assistant', 'member'] as const

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

export const NOTE_TYPES = ['outgoing', 'incoming', 'other'] as const

export const NOTE_STATUSES = [
  'draft',
  'waiting_review',
  'waiting_sent',
  'sent',
  'canceled',
] as const

export const REVIEW_TYPES = ['approve', 'change_request', 'comment', 'system'] as const

export const REVIEW_STATUSES = ['active', 'stale'] as const
