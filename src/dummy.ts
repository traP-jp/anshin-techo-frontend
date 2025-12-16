// 自由に仮データを置いたり書き換えたりしていいところ
// ただし、開発に無関係な部員の ID を含むようなリアルなデータは置かない

export const dummyReviews: Review[] = [
  {
    id: 1,
    note_id: 1,
    type: 'approval',
    reviewer: 'kitsne',
    comment: 'LGTM!',
    weight: 3,
    created_at: '2025-12-10T14:23:45Z',
  },
  {
    id: 2,
    note_id: 1,
    type: 'approval',
    reviewer: 'Yomi',
    comment: 'LGTM!',
    weight: 3,
    created_at: '2025-12-10T14:23:45Z',
  },
  {
    id: 3,
    note_id: 1,
    type: 'approval',
    reviewer: 'nano_tube',
    comment:
      'LGTM! LGTM! LGTM! LGTM! LGTM! LGTM! LGTM! LGTM! LGTM! LGTM! LGTM!\nLGTM! LGTM! LGTM! LGTM! LGTM! LGTM! LGTM! LGTM!',
    weight: 3,
    created_at: '2025-12-10T14:23:45Z',
  },
]

export const dummyNotes: Note[] = [
  {
    id: 1,
    ticket_id: 1,
    type: 'outgoing',
    status: 'sent',
    author: 'ramdos',
    content:
      '株式会社〇〇\n〇〇様\n\nいつもお世話になっております。株式会社△△の□□でございます。\nご連絡いただき、誠にありがとうございます。\nご照会の件につきまして、下記のとおりご回答いたします。\n詳細につきましては、別途資料をお送りいたしますので、ご確認いただけますと幸いです。\n\n何かご不明点等がございましたら、お知らせいただけますでしょうか。\n引き続き、どうぞよろしくお願いいたします。',
    created_at: '2025-12-08T09:15:30Z',
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
    status: 'waiting_review',
    title: 'なんとかチケット',
    description: 'これはサンプルのチケット説明です。',
    tags: ['至急', 'urgent'],
    created_at: '2025-12-05T10:30:00Z',
    updated_at: '2025-12-10T14:23:45Z',
  },
]
