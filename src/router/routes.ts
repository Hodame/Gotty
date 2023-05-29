import type { RouterOptions } from "vue-router"
import { RouteNames } from "./routeNames"

export const routes: RouterOptions['routes'] = [
  {
    path: '/auth',
    name: RouteNames.AUTH,
    component: () => import('@/views/AuthView.vue'),
  },
  {
    path: '/',
    name: RouteNames.LAYOUT,
    component: () => import('@/views/LayoutView.vue'),
    redirect: { name: RouteNames.MAIN },
    children: [
      {
      path: '/main',
      name: RouteNames.MAIN,
      component: () => import('@/views/MainView.vue') 
      },
      {
        path: '/my-games',
        name: RouteNames.MYGAMES,
        component: () => import('@/views/MyGamesView.vue')
      },
      {
        path: '/popular',
        name: RouteNames.POPULAR,
        component: () => import('@/views/PopularView.vue')
      },
      {
        path: '/settings',
        name: RouteNames.SETTINGS,
        component: () => import('@/views/SettingsView.vue')
      }
    ]
  }
]