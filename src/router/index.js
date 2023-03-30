import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home-view.vue'),
    },
    {
      path: '/search-view',
      name: 'search-view',
      component: () => import('../views/search-view.vue'),
    },
    {
      path: '/queue-view',
      name: 'queue-view',
      component: () => import('../views/queue-view.vue'),
    },
  ],
  linkActiveClass: 'active',

});

export default router;
