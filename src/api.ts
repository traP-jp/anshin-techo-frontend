/* eslint-disable
  @typescript-eslint/no-unsafe-return,
  @typescript-eslint/no-explicit-any,
  @typescript-eslint/no-unsafe-assignment
*/
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
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`)
    } else {
      const result = text ? JSON.parse(text) : {}
      // console.log(result)
      return result
    }
  }

  // --- Tickets ---

  const getTickets = async (assignee?: string, status?: Ticket['status'], sort?: string) => {
    return (await fetchApi('GET', '/tickets', {
      queryParams: {
        ...(assignee ? { assignee } : {}),
        ...(status ? { status } : {}),
        ...(sort ? { sort } : {}),
      },
    })) as Ticket[]
  }

  const postTicket = async (body: CreateTicketBody) => {
    return (await fetchApi('POST', '/tickets', { body })) as Ticket
  }

  const postEmptyTicket = async () => {
    return (await fetchApi('POST', '/tickets', {
      body: {
        title: '新しいチケット',
        description: '',
        status: 'not_planned',
        assignee: 'kitsne',
        sub_assignees: [],
        stakeholders: [],
        due: undefined,
        tags: [],
      } as CreateTicketBody,
    })) as Ticket
  }

  const getTicket = async (ticketId: number) => {
    return (await fetchApi('GET', `/tickets/${ticketId}`)) as Ticket & { notes: Note[] }
  }

  const patchTicket = async (ticketId: number, body: Partial<CreateTicketBody>) => {
    return (await fetchApi('PATCH', `/tickets/${ticketId}`, { body })) as Ticket
  }

  const deleteTicket = async (ticketId: number) => {
    return (await fetchApi('DELETE', `/tickets/${ticketId}`)) as { success: boolean }
  }

  // --- Notes ---

  const postNote = async (
    ticketId: number,
    body: { type: Note['type']; content: string; mention_notification: boolean }
  ) => {
    return (await fetchApi('POST', `/tickets/${ticketId}/notes`, { body })) as Note
  }

  const putNote = async (
    ticketId: number,
    noteId: number,
    body: { content?: string; status?: Note['status']; reset_reviews?: boolean }
  ) => {
    return (await fetchApi('PUT', `/tickets/${ticketId}/notes/${noteId}`, { body })) as Note
  }

  const deleteNote = async (ticketId: number, noteId: number) => {
    return (await fetchApi('DELETE', `/tickets/${ticketId}/notes/${noteId}`)) as {
      success: boolean
    }
  }

  // --- Reviews ---

  const postReview = async (ticketId: number, noteId: number, body: CreateReviewBody) => {
    return (await fetchApi('POST', `/tickets/${ticketId}/notes/${noteId}/reviews`, {
      body,
    })) as Review
  }

  const putReview = async (
    ticketId: number,
    noteId: number,
    reviewId: number,
    body: CreateReviewBody
  ) => {
    return (await fetchApi('PUT', `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`, {
      body,
    })) as Review
  }

  const deleteReview = async (ticketId: number, noteId: number, reviewId: number) => {
    return (await fetchApi(
      'DELETE',
      `/tickets/${ticketId}/notes/${noteId}/reviews/${reviewId}`
    )) as { success: boolean }
  }

  // --- Users ---

  const getUsers = async () => {
    return (await fetchApi('GET', '/users')) as User[]
  }

  const putUsers = async (body: User[]) => {
    return (await fetchApi('PUT', '/users', { body })) as { success: boolean }
  }

  // --- Config ---

  const getConfig = async () => {
    return (await fetchApi('GET', '/config')) as {
      reminder_interval: {
        overdue_day: number[]
        notesent_hour: number
      }
      revise_prompt: string
    }
  }

  const postConfig = async (body: {
    reminder_interval: {
      overdue_day: number[]
      notesent_hour: number
    }
    revise_prompt: string
  }) => {
    return (await fetchApi('POST', '/config', { body })) as { success: boolean }
  }

  const getMe = async () => {
    if (import.meta.env.DEV) {
      // 開発環境用のダミー実装
      await putUsers([{ traq_id: import.meta.env.VITE_TRAQ_ID, role: 'manager' }])
      console.log(await getUsers())
      return { id: import.meta.env.VITE_TRAQ_ID }
    } else {
      return (await fetchApi('GET', '/me')) as { id: string } // 本来の機能
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
