// クライアントサイドルーティングを可能にする Vue Router の設定

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/ticket/:id',
    name: 'Ticket',
    component: () => import('@/views/TicketView.vue'),
  },
  {
    path: '/:path(.*)*',
    name: 'NotFoundView',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
