import { createRouter, createWebHistory } from 'vue-router'
// createWebHashHistory
// import HomePage from '../App.vue'

const routes = [
   {
      path: '/teaching-tools/periodic-table',
      name: 'home',
      component: () => import('../App.vue')
   },
   {
     path: '/kunye',
     name: 'kunye',
     component: () => import('../pages/credits-page.vue')
   },
   {
     path: '/hakkinda',
     name: 'hakkında',
     component: () => import('../pages/about-page.vue')
   },
   {
     path: '/bilgi',
     name: 'bilgi',
     component: () => import('../pages/info-page.vue')
   }
]

const router = createRouter({
   history: createWebHistory(), //createWebHashHistory(),
   routes
})
export default router