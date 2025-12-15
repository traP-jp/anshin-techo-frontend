// 自由に仮データを置いたり書き換えたりしていいところ
// ただし、開発に無関係な部員の ID を含むようなリアルなデータは置かない

export const dummyReviews: Review[] = [
  {
    id: 1,
    type: 'approval',
    status: 'active',
    author: 'kitsne',
    comment: 'LGTM!',
    weight: 3,
    created_at: '2025-12-10T14:23:45Z',
    updated_at: '2025-12-10T14:23:45Z',
    deleted_at: null,
  },
]

export const dummyNotes: Note[] = [
  {
    id: 1,
    type: 'outgoing',
    status: 'sent',
    author: 'ramdos',
    content: 'これはサンプルのノートコンテンツです。',
    created_at: '2025-12-08T09:15:30Z',
    updated_at: '2025-12-10T14:23:45Z',
    deleted_at: null,
    review_assignees: ['kitsne'],
    reviews: dummyReviews,
  },
]

export const dummyTickets: Ticket[] = [
  {
    id: 1,
    assignee: 'ramdos',
    sub_assignees: ['kitsne'],
    stakeholders: ['ramdos', 'kitsne'],
    due: '2024-12-31T23:59:59Z',
    status: 'writing',
    title: 'なんとかチケット',
    description: 'これはサンプルのチケット説明です。',
    client: '相手の会社',
    tag: ['至急', 'urgent'],
    created_at: '2025-12-05T10:30:00Z',
    updated_at: '2025-12-10T14:23:45Z',
    deleted_at: null,
    notes: dummyNotes,
  },
]
