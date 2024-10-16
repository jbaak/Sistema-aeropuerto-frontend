import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import FlightListView from '@/views/FlightListView.vue'
import DashboardView from '@/views/DashboardView.vue'
import useAuth from '@/store/auth'

const routes = [
  {
    path: '/',
    name: 'flightList',
    component: FlightListView,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  const isAuth = auth.token

  if( to.meta.requireAuth && isAuth == null) {
    next('login')
  } else {
    next()
  }
})

export default router
