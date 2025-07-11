// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import Environment from '@/views/Environment.vue'

const routes = [
  {
    path: '/',
    name: 'environment',
    component: Environment
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router