import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // redirect: '/show1',
    component: Home
  },
  {
    path: '/show1',
    name: 'Show1',
    component: () => { return import('../views/Show1.vue') }
  },
  {
    path: '/show2',
    name: 'Show2',
    component: () => { return import('../views/Show2.vue') }
  },
  {
    path: '/show3',
    name: 'Show3',
    component: () => { return import('../views/Show3.vue') }
  },
  {
    path: '/show4',
    name: 'Show4',
    component: () => { return import('../views/Show4.vue') }
  },
  {
    path: '/show5',
    name: 'Show5',
    component: () => { return import('../views/Show5.vue') }
  },
  {
    path: '/show6',
    name: 'Show6',
    component: () => { return import('../views/Show6.vue') }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
