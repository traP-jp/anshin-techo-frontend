/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any */
import { useUserStore } from '@/store'
const userStore = useUserStore()

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// あたたかみのあるてがき
export const fetchApi = async (
  method: HttpMethod,
  path: string,
  option?: { queryParams?: Record<string, string>; body?: Record<string, any> }
) => {
  const queryParamStr = option?.queryParams
    ? '?' + new URLSearchParams(option?.queryParams).toString()
    : ''

  const request: RequestInit = {
    method: method,
    headers: { 'X-Forwarded-User': userStore.userId!, 'Content-Type': 'application/json' },
    body: option?.body ? JSON.stringify(option.body) : undefined,
  }

  const res = await fetch(`/api${path}${queryParamStr}`, request)
  if (res.status === 200) {
    return await res.json()
  } else {
    console.log(`API Error: ${res.status} ${res.statusText}`)
    return null
  }
}

// --- Tickets ---

export const getTickets = async (assignee: string, status: Ticket['status'], sort: string) => {
  return fetchApi('GET', '/tickets', { queryParams: { assignee, status, sort } })
}

export const postTickets = async (body: PostTicket) => {
  return fetchApi('POST', '/tickets', { body })
}

export const getTicket = async (ticketId: number) => {
  return fetchApi('GET', `/tickets/${ticketId}`)
}

export const patchTicket = async (ticketId: number, body: PostTicket) => {
  return fetchApi('PATCH', `/tickets/${ticketId}`, { body })
}

export const deleteTicket = async (ticketId: number) => {
  return fetchApi('DELETE', `/tickets/${ticketId}`)
}

// --- Notes ---

export const postNote = async (
  ticketId: number,
  body: { type: Note['type']; content: string; mention_notification: boolean }
) => {
  return fetchApi('POST', `/tickets/${ticketId}/notes`, { body })
}

export const putNote = async (
  ticketId: number,
  noteId: number,
  body: { content?: string; status?: Note['status']; reset_reviews?: boolean }
) => {
  return fetchApi('PUT', `/tickets/${ticketId}/notes/${noteId}`, { body })
}

export const deleteNote = async (ticketId: number, noteId: number) => {
  return fetchApi('DELETE', `/tickets/${ticketId}/notes/${noteId}`)
}

// --- Reviews ---

export const postReview = async (ticketId: number, noteId: number, body: PostReview) => {
  return fetchApi('POST', `/tickets/${ticketId}/notes/${noteId}/reviews`, { body })
}

export const putReview = async (
  ticketId: number,
  noteId: number,
  reviewId: number,
  body: PostReview
) => {
  return fetchApi('PUT', `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`, { body })
}

export const deleteReview = async (ticketId: number, noteId: number, reviewId: number) => {
  return fetchApi('DELETE', `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`)
}

// --- Users ---

export const getUsers = async () => {
  return fetchApi('GET', '/users')
}

export const putUsers = async (body: User[]) => {
  return fetchApi('PUT', '/users', { body })
}

// --- Config ---

export const getConfig = async () => {
  return fetchApi('GET', '/config')
}

export const postConfig = async (body: {
  reminder_interval: {
    overdue_day: number[]
    notesent_hour: number
  }
  revise_prompt: string
}) => {
  return fetchApi('POST', '/config', { body })
}
