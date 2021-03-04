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
import fourOfour from '../views/fourOfour.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    async beforeEnter (to, from, next) {
      try {
        const isAdminAuthenticated = await store.getters.isAdminAuthenticated
        const isUserLoggedIn = await store.getters.isAuthenticated
        if (!isUserLoggedIn && !isAdminAuthenticated) {
          next()
        } else {
          if (isUserLoggedIn) {
            next({ name: 'dashboard' })
          } else if (isAdminAuthenticated) {
            next({ name: 'adminHome' })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    async beforeEnter (to, from, next) {
      try {
        const isAdminAuthenticated = await store.getters.isAdminAuthenticated
        const isUserLoggedIn = await store.getters.isAuthenticated
        if (!isUserLoggedIn && !isAdminAuthenticated) {
          next()
        } else {
          if (isUserLoggedIn) {
            next({ name: 'dashboard' })
          } else if (isAdminAuthenticated) {
            next({ name: 'adminHome' })
          }
        }
      } catch (error) {
        next({
          name: 'dashboard'
          // query: { redirectFrom: to.fullPath }
        })
      }
    }
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
        } else {
          next({
            name: 'login',
            query: { redirectFrom: to.fullPath }
          })
        }
      } catch (error) {
        console.log(error)
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
          next({ name: 'dashboard' })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: '/test/:course',
    name: 'Test',
    component: Test,
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
        console.log(error)
      }
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AminLogin,
    async beforeEnter (to, from, next) {
      try {
        const isAdminAuthenticated = await store.getters.isAdminAuthenticated
        const isUserLoggedIn = await store.getters.isAuthenticated
        if (!isUserLoggedIn && !isAdminAuthenticated) {
          next()
        } else {
          if (isUserLoggedIn) {
            next({ name: 'dashboard' })
          } else if (isAdminAuthenticated) {
            next({ name: 'adminHome' })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: '/index',
    name: 'AdminHome',
    component: AdminDashboard,
    async beforeEnter (to, from, next) {
      try {
        const isAuthourized = await store.getters.isAdminAuthenticated
        if (isAuthourized) {
          next()
        } else {
          next({ name: 'login' })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: '*',
    component: fourOfour
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
