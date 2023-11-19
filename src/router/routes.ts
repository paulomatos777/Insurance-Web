import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/users',
        component: () => import('pages/ListUsersPage.vue')
      },
      {
        path: '/user/create',
        component: () => import('pages/UserPage.vue')
      },
      {
        path: '/users/edit/:id',
        component: () => import('pages/ListUsersPage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
