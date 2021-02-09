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
    name: 'dashboard',
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
    name: 'TestInstruction',
    component: TestInstruction,
    async beforeEnter (to, from, next) {
      try {
        const availableCourses = await store.state.todayCourses
        const course = to.params.course
        if (availableCourses.indexOf(course) >= 0) {
          next()
        } else {
          next({
            name: 'dashboard'
            // query: { redirectFrom: to.fullPath }
          })
        }
      } catch (error) {
        next({
          name: 'dashboard',
          query: { redirectFrom: to.fullPath }
        })
      }
    }
  },
  {
    path: '/test/:course',
    name: 'Test',
    component: Test,
    async beforeEnter (to, from, next) {
      try {
        const isAuthourized = await store.getters.testAvailable
        if (isAuthourized) {
          next()
        }
      } catch (error) {
        next({
          name: 'dashboard',
          query: { redirectFrom: to.fullPath }
        })
      }
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AminLogin
  },
  {
    path: '/index',
    name: 'AdminHome',
    component: AdminDashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
