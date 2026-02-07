import { z } from 'zod'
import { useUserStore } from './store'

// prettier-ignore
import {
  TicketSchema, TicketDetailSchema, NoteSchema, ReviewSchema,
  UserSchema, ConfigSchema, SuccessResponseSchema,
} from './lib/schema'

// prettier-ignore
import type {
  Ticket, TicketDetail, PostTicketBody, PatchTicketBody,
  Note, PostNoteBody, PutNoteBody,
  Review, PostReviewBody, PutReviewBody,
  User,
} from './lib/schema'

const apiClient = () => {
  const fetchApi = async <T>(
    schema: z.ZodType<T>,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    option?: { queryParams?: Record<string, string>; body?: unknown }
  ) => {
    const { userId } = useUserStore()
    const queryParamStr = option?.queryParams
      ? '?' + new URLSearchParams(option.queryParams).toString()
      : ''

    const request: RequestInit = {
      method: method,
      headers: {
        ...(userId ? { 'X-Forwarded-User': userId } : {}),
        'Content-Type': 'application/json',
      },
      body: option?.body ? JSON.stringify(option.body) : undefined,
    }

    const res = await fetch(`/api${path}${queryParamStr}`, request)
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`)
    const text = await res.text()
    if (!text) return schema.parse({ success: true })
    const result = schema.safeParse(JSON.parse(text))
    if (!result.success) {
      console.error(result.error)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.error({ method, path, option, data: JSON.parse(text) })
      throw new Error('API Response Schema Mismatch')
    }
    return result.data
  }

  // --- Tickets ---

  const getTickets = async (
    assignee?: string,
    status?: Ticket['status'],
    sort?: string
  ): Promise<Ticket[]> => {
    return fetchApi(z.array(TicketSchema), 'GET', '/tickets', {
      queryParams: {
        ...(assignee ? { assignee } : {}),
        ...(status ? { status } : {}),
        ...(sort ? { sort } : {}),
      },
    })
  }

  const postTicket = async (body: PostTicketBody): Promise<Ticket> => {
    return fetchApi(TicketSchema, 'POST', '/tickets', { body })
  }

  const postEmptyTicket = async (): Promise<Ticket> => {
    const { ensureUserId } = useUserStore()
    return postTicket({
      title: '新しいチケット',
      description: '',
      status: 'not_planned',
      assignee: ensureUserId(),
      sub_assignees: [],
      stakeholders: [],
      tags: [],
    })
  }

  const getTicket = async (ticketId: number): Promise<TicketDetail> => {
    return fetchApi(TicketDetailSchema, 'GET', `/tickets/${ticketId}`)
  }

  const patchTicket = async (ticketId: number, body: PatchTicketBody) => {
    // 戻り値は Ticket にする？
    return fetchApi(SuccessResponseSchema, 'PATCH', `/tickets/${ticketId}`, { body })
  }

  const deleteTicket = async (ticketId: number) => {
    return fetchApi(SuccessResponseSchema, 'DELETE', `/tickets/${ticketId}`)
  }

  // --- Notes ---

  const postNote = async (ticketId: number, body: PostNoteBody): Promise<Note> => {
    return fetchApi(NoteSchema, 'POST', `/tickets/${ticketId}/notes`, { body })
  }

  const putNote = async (ticketId: number, noteId: number, body: PutNoteBody): Promise<Note> => {
    return fetchApi(NoteSchema, 'PUT', `/tickets/${ticketId}/notes/${noteId}`, { body })
  }

  const deleteNote = async (ticketId: number, noteId: number) => {
    return fetchApi(SuccessResponseSchema, 'DELETE', `/tickets/${ticketId}/notes/${noteId}`)
  }

  // --- Reviews ---

  const postReview = async (
    ticketId: number,
    noteId: number,
    body: PostReviewBody
  ): Promise<Review> => {
    return fetchApi(ReviewSchema, 'POST', `/tickets/${ticketId}/notes/${noteId}/reviews`, {
      body,
    })
  }

  const putReview = async (
    ticketId: number,
    noteId: number,
    reviewId: number,
    body: PutReviewBody
  ): Promise<Review> => {
    return fetchApi(
      ReviewSchema,
      'PUT',
      `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`,
      { body }
    )
  }

  const deleteReview = async (ticketId: number, noteId: number, reviewId: number) => {
    return fetchApi(
      SuccessResponseSchema,
      'DELETE',
      `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`
    )
  }

  // --- Users ---

  const getUsers = async (): Promise<User[]> => {
    return fetchApi(z.array(UserSchema), 'GET', '/users')
  }

  const putUsers = async (body: User[]) => {
    // 戻り値は User[] にする？
    return fetchApi(SuccessResponseSchema, 'PUT', '/users', { body })
  }

  // --- Config ---

  const getConfig = async () => {
    return fetchApi(ConfigSchema, 'GET', '/config')
  }

  const postConfig = async (body: z.infer<typeof ConfigSchema>) => {
    // POST -> PUT にした上で戻り値は Config にする？
    return fetchApi(SuccessResponseSchema, 'POST', '/config', { body })
  }

  const getMe = async () => {
    return fetchApi(z.object({ id: z.string() }), 'GET', '/me')
  }

  return {
    getTickets,
    postTicket,
    postEmptyTicket,
    getTicket,
    patchTicket,
    deleteTicket,
    postNote,
    putNote,
    deleteNote,
    postReview,
    putReview,
    deleteReview,
    getUsers,
    putUsers,
    getConfig,
    postConfig,
    getMe,
  }
}

export const api = apiClient()
