/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any */
import { useUserStore } from './store'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const apiClient = () => {
  // あたたかみのあるてがき
  const fetchApi = async (
    method: HttpMethod,
    path: string,
    option?: { queryParams?: Record<string, string>; body?: Record<string, any> }
  ) => {
    const { userId } = useUserStore()
    const queryParamStr = option?.queryParams
      ? '?' + new URLSearchParams(option?.queryParams).toString()
      : ''

    const request: RequestInit = {
      method: method,
      headers: { 'X-Forwarded-User': userId!, 'Content-Type': 'application/json' },
      body: option?.body ? JSON.stringify(option.body) : undefined,
    }

    const res = await fetch(`/api${path}${queryParamStr}`, request)
    return await res.json()
  }

  // --- Tickets ---

  const getTickets = async (assignee: string, status: Ticket['status'], sort: string) => {
    return fetchApi('GET', '/tickets', { queryParams: { assignee, status, sort } })
  }

  const postTicket = async (body: PostTicket) => {
    return fetchApi('POST', '/tickets', { body })
  }

  const getTicket = async (ticketId: number) => {
    return fetchApi('GET', `/tickets/${ticketId}`)
  }

  const patchTicket = async (ticketId: number, body: PostTicket) => {
    return fetchApi('PATCH', `/tickets/${ticketId}`, { body })
  }

  const deleteTicket = async (ticketId: number) => {
    return fetchApi('DELETE', `/tickets/${ticketId}`)
  }

  // --- Notes ---

  const postNote = async (
    ticketId: number,
    body: { type: Note['type']; content: string; mention_notification: boolean }
  ) => {
    return fetchApi('POST', `/tickets/${ticketId}/notes`, { body })
  }

  const putNote = async (
    ticketId: number,
    noteId: number,
    body: { content?: string; status?: Note['status']; reset_reviews?: boolean }
  ) => {
    return fetchApi('PUT', `/tickets/${ticketId}/notes/${noteId}`, { body })
  }

  const deleteNote = async (ticketId: number, noteId: number) => {
    return fetchApi('DELETE', `/tickets/${ticketId}/notes/${noteId}`)
  }

  // --- Reviews ---

  const postReview = async (ticketId: number, noteId: number, body: PostReview) => {
    return fetchApi('POST', `/tickets/${ticketId}/notes/${noteId}/reviews`, { body })
  }

  const putReview = async (
    ticketId: number,
    noteId: number,
    reviewId: number,
    body: PostReview
  ) => {
    return fetchApi('PUT', `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`, { body })
  }

  const deleteReview = async (ticketId: number, noteId: number, reviewId: number) => {
    return fetchApi('DELETE', `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`)
  }

  // --- Users ---

  const getUsers = async () => {
    return fetchApi('GET', '/users')
  }

  const putUsers = async (body: User[]) => {
    return fetchApi('PUT', '/users', { body })
  }

  // --- Config ---

  const getConfig = async () => {
    return fetchApi('GET', '/config')
  }

  const postConfig = async (body: {
    reminder_interval: {
      overdue_day: number[]
      notesent_hour: number
    }
    revise_prompt: string
  }) => {
    return fetchApi('POST', '/config', { body })
  }

  return {
    getTickets,
    postTicket,
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
  }
}

export const api = apiClient()
