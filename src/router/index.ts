import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/categories/:id',
      name: 'categories',
      component: () => import('../views/CategoriesPage.vue'),
      props: true,
    },
    {
      path: '/categories/:id/detail/:pid?',
      name: 'details',
      component: () => import('@/components/detailProduct.vue'),
      props: true,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchProduct.vue'),
      props: route => ({ query: route.query.q }) 
    },

    // for admin page
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/HomeAdmin.vue')
    }
  ],
})

export default router
