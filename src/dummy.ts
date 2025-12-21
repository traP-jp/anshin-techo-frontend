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
    comment: 'この!!景品!!に関する説明、!!景品の正式名!!を明示した方がよいかも',
    weight: 3,
    created_at: '2025-12-10T14:23:45Z',
  },
]

export const dummyNotes: Note[] = [
  {
    id: 1,
    ticket_id: 1,
    type: 'incoming',
    status: 'sent',
    author: 'someone',
    content:
      '東京科学大学デジタル創作同好会\n!!本名!!様\nいつもお世話になっております。株式会社!!会社名!!の!!担当者名!!\nでございます。\nご連絡いただき、誠にありがとうございます。\nご照会の件につきまして、下記のとおりご回答いたします。\n詳細につきましては、別途資料をお送りいたしますので、ご確認いただけますと幸いです。\n何かご不明点等がございましたら、お知らせいただけますでしょうか。\n引き続き、どうぞよろしくお願いいたします。',
    created_at: '2025-12-08T09:15:30Z',
    reviews: dummyReviews,
  },
  {
    id: 2,
    ticket_id: 1,
    type: 'other',
    status: 'sent',
    author: 'ramdos',
    content: 'サンプルの!!other!!ノートです。',
    created_at: '2025-12-08T09:15:30Z',
    reviews: dummyReviews,
  },
  {
    id: 3,
    ticket_id: 1,
    type: 'outgoing',
    status: 'waiting_review',
    author: 'ramdos',
    content:
      '株式会社!!会社名!!\n!!担当者名!!様\nいつもお世話になっております。東京科学大学デジタル創作同好会の!!本名!!でございます。\nご連絡いただき、誠にありがとうございます。\nご照会の件につきまして、下記のとおりご回答いたします。\n詳細につきましては、別途資料をお送りいたしますので、ご確認いただけますと幸いです。\n何かご不明点等がございましたら、お知らせいただけますでしょうか。\n引き続き、どうぞよろしくお願いいたします。',
    created_at: '2025-12-08T09:15:30Z',
    reviews: dummyReviews,
  },
  {
    id: 4,
    ticket_id: 1,
    type: 'incoming',
    status: 'sent',
    author: 'someone',
    content:
      '東京科学大学デジタル創作同好会\n!!本名!!様\nいつもお世話になっております。株式会社!!会社名!!の!!担当者名!!\nでございます。\nご連絡いただき、誠にありがとうございます。\nご照会の件につきまして、下記のとおりご回答いたします。\n詳細につきましては、別途資料をお送りいたしますので、ご確認いただけますと幸いです。\n何かご不明点等がございましたら、お知らせいただけますでしょうか。\n引き続き、どうぞよろしくお願いいたします。',
    created_at: '2025-12-08T09:15:30Z',
    reviews: dummyReviews,
  },
  {
    id: 5,
    ticket_id: 1,
    type: 'other',
    status: 'sent',
    author: 'ramdos',
    content: 'サンプルの!!other!!ノートです。',
    created_at: '2025-12-08T09:15:30Z',
    reviews: dummyReviews,
  },
  {
    id: 6,
    ticket_id: 1,
    type: 'outgoing',
    status: 'waiting_review',
    author: 'kitsne',
    content:
      '株式会社!!会社名!!\n!!担当者名!!様\nいつもお世話になっております。東京科学大学デジタル創作同好会の!!本名!!でございます。\nご連絡いただき、誠にありがとうございます。\nご照会の件につきまして、下記のとおりご回答いたします。\n詳細につきましては、別途資料をお送りいたしますので、ご確認いただけますと幸いです。\n何かご不明点等がございましたら、お知らせいただけますでしょうか。\n引き続き、どうぞよろしくお願いいたします。',
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
    due: '2024-12-31',
    status: 'waiting_review',
    title: 'なんとかチケット',
    description: 'これはサンプルのチケット説明です。',
    // client: '相手の会社',
    tags: ['至急', 'urgent'],
    created_at: '2025-12-05T10:30:00Z',
    updated_at: '2025-12-10T14:23:45Z',
  },
  {
    id: 2,
    assignee: 'kitsne',
    sub_assignees: ['kitsne'],
    stakeholders: ['ramdos', 'kitsne'],
    due: '2024-12-31T23:59:59Z',
    status: 'waiting_sent',
    title: 'なんとかチケット',
    description: 'これはサンプルのチケット説明です。',
    client: '相手の会社',
    tags: ['至急', 'urgent'],
    created_at: '2025-12-05T10:30:00Z',
    updated_at: '2025-12-10T14:23:45Z',
  },
  {
    id: 3,
    assignee: 'yomi',
    sub_assignees: ['kitsne'],
    stakeholders: ['ramdos', 'kitsne'],
    due: '2024-12-31T23:59:59Z',
    status: 'sent',
    title: 'なんとかチケット',
    description: 'これはサンプルのチケット説明です。',
    client: '相手の会社',
    tags: ['至急', 'urgent'],
    created_at: '2025-12-05T10:30:00Z',
    updated_at: '2025-12-10T14:23:45Z',
  },
]

export const dummyUsers: User[] = [
  {
    traq_id: 'ramdos',
    role: 'manager',
  },
  {
    traq_id: 'kitsne',
    role: 'manager',
  },
  {
    traq_id: 'nano_tube',
    role: 'manager',
  },
  {
    traq_id: 'Yomi',
    role: 'manager',
  },
  {
    traq_id: 'hachimitsu',
    role: 'manager',
  },
  {
    traq_id: 'dislike_fruits',
    role: 'manager',
  },
]

export const dummyUserIds = dummyUsers.map((user) => user.traq_id)
