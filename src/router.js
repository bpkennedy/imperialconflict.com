import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './api/auth'

Vue.use(VueRouter)

const requiresAuth = (to, from, next) => {
  if (!auth.loggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    })
  } else {
    next()
  }
}

const redirectGateIfAuthenticated = (to, from, next) => {
  if (auth.loggedIn()) {
    next({
      path: '/gate',
      query: { redirect: to.fullPath },
    })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Welcome.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
    ],
    beforeEnter: redirectGateIfAuthenticated,
  },
  {
    path: '/planets/:planetId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Planet.vue') },
    ],
  },
  {
    path: '/gate',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Gate.vue') },
    ],
    beforeEnter: requiresAuth,
  },
  {
    path: '/hq',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Headquarters.vue') },
    ],
    beforeEnter: requiresAuth,
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
]

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
})

export default router
