import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '../modules/useAuth.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginView.vue'),
   
    },
      {
    path: '/new-trending',
    name: 'NewTrending',
    component: () => import('../views/NewAndTrending.vue') 
  },
  {
    path: '/top-100',
    name: 'Top100',
    component: () => import('../views/Top100.vue')  
  },
  {
    path: '/game/:id', 
    name: 'GameDetail',
    component: () => import('../views/GameDetail.vue')
  },
  ],

})


router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next({name: 'login'})
  }
  else {
    next()
  }
})

export default router
