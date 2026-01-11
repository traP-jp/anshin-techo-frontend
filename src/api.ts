import { z } from 'zod'
import { useUserStore } from './store'
import { env } from './lib/env'
import {
  TicketSchema,
  TicketDetailSchema,
  NoteSchema,
  ReviewSchema,
  UserSchema,
  ConfigSchema,
  SuccessResponseSchema,
  type CreateTicketBody,
  type CreateReviewBody,
  type CreateNoteBody,
  type UpdateNoteBody,
  type UpdateReviewBody,
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
      ? '?' + new URLSearchParams(option?.queryParams).toString()
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

    // ボディが空の場合のハンドリング
    if (!text) {
      // スキーマが void や undefined を許容するなら通す
      return schema.parse(undefined)
    }

    return schema.parse(JSON.parse(text))
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

  const postTicket = async (body: CreateTicketBody): Promise<Ticket> => {
    return fetchApi(TicketSchema, 'POST', '/tickets', { body })
  }

  const postEmptyTicket = async (): Promise<Ticket> => {
    return postTicket({
      title: '新しいチケット',
      description: '',
      status: 'not_planned',
      assignee: 'kitsne',
      sub_assignees: [],
      stakeholders: [],
      due: null,
      tags: [],
    })
  }

  const getTicket = async (ticketId: number): Promise<TicketDetail> => {
    return fetchApi(TicketDetailSchema, 'GET', `/tickets/${ticketId}`)
  }

  const patchTicket = async (
    ticketId: number,
    body: Partial<CreateTicketBody>
  ): Promise<Ticket> => {
    return fetchApi(TicketSchema, 'PATCH', `/tickets/${ticketId}`, { body })
  }

  const deleteTicket = async (ticketId: number) => {
    return fetchApi(SuccessResponseSchema, 'DELETE', `/tickets/${ticketId}`)
  }

  // --- Notes ---

  const postNote = async (ticketId: number, body: CreateNoteBody): Promise<Note> => {
    return fetchApi(NoteSchema, 'POST', `/tickets/${ticketId}/notes`, { body })
  }

  const putNote = async (ticketId: number, noteId: number, body: UpdateNoteBody): Promise<Note> => {
    return fetchApi(NoteSchema, 'PUT', `/tickets/${ticketId}/notes/${noteId}`, { body })
  }

  const deleteNote = async (ticketId: number, noteId: number) => {
    return fetchApi(SuccessResponseSchema, 'DELETE', `/tickets/${ticketId}/notes/${noteId}`)
  }

  // --- Reviews ---

  const postReview = async (
    ticketId: number,
    noteId: number,
    body: CreateReviewBody
  ): Promise<Review> => {
    return fetchApi(ReviewSchema, 'POST', `/tickets/${ticketId}/notes/${noteId}/reviews`, {
      body,
    })
  }

  const putReview = async (
    ticketId: number,
    noteId: number,
    reviewId: number,
    body: UpdateReviewBody
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
    return fetchApi(SuccessResponseSchema, 'PUT', '/users', { body })
  }

  // --- Config ---

  const getConfig = async () => {
    return fetchApi(ConfigSchema, 'GET', '/config')
  }

  const postConfig = async (body: z.infer<typeof ConfigSchema>) => {
    return fetchApi(SuccessResponseSchema, 'POST', '/config', { body })
  }

  const getMe = async () => {
    if (import.meta.env.MODE === 'development' && env.VITE_TRAQ_ID) {
      // 開発環境用のダミー実装。環境変数のユーザーを自動で登録する
      await putUsers([{ traq_id: env.VITE_TRAQ_ID, role: 'manager' }])
      console.log('Users:', await getUsers())
      return { id: env.VITE_TRAQ_ID }
    } else {
      return fetchApi(z.object({ id: z.string() }), 'GET', '/me')
    }
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
