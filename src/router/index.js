import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index.js'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashoard from '../views/Dashboard.vue'
import TestInstruction from '../views/TestInstruction.vue'
import Test from '../views/Test.vue'
import AminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashoard',
    component: Dashoard,
    async beforeEnter (to, from, next) {
      try {
        const isAuthourized = await store.getters.isAuthenticated
        if (isAuthourized) {
          next()
        }
      } catch (error) {
        next({
          name: 'login',
          query: { redirectFrom: to.fullPath }
        })
      }
    }
  },
  {
    path: '/instruction/:course',
    name: 'Test Instruction',
    component: TestInstruction
  },
  {
    path: '/test/:course',
    name: 'Test',
    component: Test
  },
  {
    path: '/admin',
    name: 'admin',
    component: AminLogin
  },
  {
    path: '/index',
    name: 'Admin Home',
    component: AdminDashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
