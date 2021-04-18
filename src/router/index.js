import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index.js'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import TestInstruction from '../views/TestInstruction.vue'
import Test from '../views/Test.vue'
import AminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import four0Four from '../views/fourOfour.vue'

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
        console.log(isUserLoggedIn, isAdminAuthenticated)
        if (!isUserLoggedIn && !isAdminAuthenticated) {
          next()
        } else {
          if (isUserLoggedIn) {
            next({ name: 'Dashboard' })
          } else if (isAdminAuthenticated) {
            console.log('here')
            next({ name: 'AdminHome' })
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
            next({ name: 'Dashboard' })
          } else if (isAdminAuthenticated) {
            next({ name: 'AdminHome' })
          }
        }
      } catch (error) {
        next({
          name: 'Dashboard'
          // query: { redirectFrom: to.fullPath }
        })
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    async beforeEnter (to, from, next) {
      try {
        const isAuthorized = await store.getters.isAuthenticated
        if (isAuthorized) {
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
          next({ name: 'Dashboard' })
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
            name: 'Dashboard'
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
    name: 'AdminLogin',
    component: AminLogin,
    async beforeEnter (to, from, next) {
      try {
        const isAdminAuthenticated = await store.getters.isAdminAuthenticated
        const isUserLoggedIn = await store.getters.isAuthenticated
        if (!isUserLoggedIn && !isAdminAuthenticated) {
          next()
        } else {
          if (isUserLoggedIn) {
            next({ name: 'Dashboard' })
          } else if (isAdminAuthenticated) {
            next({ name: 'AdminHome' })
          } else {
            next()
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
        const isAuthorized = await store.getters.isAdminAuthenticated
        if (isAuthorized) {
          next()
        } else {
          next({ name: 'AdminLogin' })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  {
    path: '*',
    component: four0Four
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
