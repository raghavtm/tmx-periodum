import { createRouter, createWebHistory } from 'vue-router'
// createWebHashHistory
// import HomePage from '../App.vue'

const routes = [
   {
      path: '/teaching-tools/periodic-table',
      name: 'home',
      component: () => import('../App.vue')
   },
]

const router = createRouter({
   history: createWebHistory(), //createWebHashHistory(),
   routes
})
export default router