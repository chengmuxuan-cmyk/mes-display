// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import { useHomePageStore } from '@/store/modules/homePageStore';

import Environment from '@/views/Environment.vue'
import FloorPlan from '@/views/FloorPlan.vue'

const routes = [
  {
    path: '/',
    name: 'environment',
    component: Environment
  },
  {
    path: '/floorPlan/:level?',
    name: 'floorPlan',
    component: FloorPlan
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 判断当前路由是否是首页

  const homePageStore = useHomePageStore();
  if(homePageStore) {
    if (to.path === '/') {
      homePageStore.setIsHomePage(true);
    } else {
      homePageStore.setIsHomePage(false);
    }
  }
  next();
});

export default router