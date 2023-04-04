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
      path: '/playlist-view',
      name: 'playlist-view',
      component: () => import('../views/playlist-view.vue'),
    },
    // {path: '/test-view', name: 'test-view', component: () => import('../views/test-view.vue'),},

  ],
  linkActiveClass: 'active',

});

export default router;
