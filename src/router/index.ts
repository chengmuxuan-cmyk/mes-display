// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Environment from '@/views/Environment.vue'

const routes = [
  {
    path: '/',
    name: 'environment',
    component: Environment
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router