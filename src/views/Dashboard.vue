<template>
  <div class="dashboard-view-container">
    <div class="nav-head">
      <div class="logo-holder">
        <div class="logo">
          <router-link
            to="/dashboard"
            @click="toggleView('home')"
          >
            <img src="../assets/BTA11.png" alt="BTA LOGO">
          </router-link>        </div>
      </div>
      <div class="salutation">
        <p>Good Morning, <span>Ganiu</span></p>
      </div>
    </div>
    <div class="mobile-nav">
      <div class="logo-holder">
        <div class="logo">
          <router-link
            to="/dashboard"
            @click="toggleView('home')"
          >
            <img src="../assets/BTA11.png" alt="BTA LOGO">
          </router-link>
        </div>
      </div>
      <div class="toggle-nav">
        <span>
          <b-icon
            v-show="!showMobileNav"
            icon="list"
            class="nav-icon"
            @click="toggleMobileNav"
          ></b-icon>
        </span>
      </div>
    </div>
    <main class="main-container">
      <div class="menus">
        <ul>
          <li
            :class="{selected: nav.home}"
            @click="toggleView('home')"
          >Home</li>
          <li
            v-if="hasNotResgisteredCourses"
            :class="{selected: nav.courseReg}"
            @click="toggleView('course reg')"
          >Course Registration</li>
          <li
            :class="{selected: nav.checkResult}"
            @click="toggleView('check result')"
          >Check Result</li>
          <li
            :class="{selected: nav.about}"
            @click="toggleView('about')"

          >About</li>
          <li
            @click="signOut"
          >Sign Out</li>
        </ul>
      </div>
      <section class="details">
        <CourseReg v-if="nav.courseReg" />
        <ResultChecker v-if="nav.checkResult" />
        <Home
          v-show="nav.home"
          @isRegister="acceptDataFromHomeTemplate"
         />
        <About v-show="nav.about" />
      </section>
    </main>
    <MobileNavModal
      v-show="showMobileNav"
      :toggleMobileNav="toggleMobileNav"
      :toggleView="toggleView"
      :nav="nav"
      :signOut="signOut"
      :hasNotResgisteredCourses="hasNotResgisteredCourses"
    />
  </div>
</template>

<script>
import CourseReg from '@/components/CourseReg.vue'
import ResultChecker from '@/components/ResultChecker.vue'
import MobileNavModal from '@/components/MobileNavModal.vue'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

import { mapActions, mapState } from 'vuex'
export default {
  components: {
    CourseReg,
    ResultChecker,
    MobileNavModal,
    Home,
    About
  },
  data () {
    return {
      hasNotResgisteredCourses: false,
      showMobileNav: false,
      nav: {
        home: true,
        about: false,
        courseReg: false,
        startExam: false,
        checkResult: false
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'logOut'
    ]),
    toggleMobileNav () {
      this.showMobileNav = !this.showMobileNav
    },
    toggleView (view) {
      if (view === 'home') {
        this.nav = {
          home: true,
          about: false,
          courseReg: false,
          checkResult: false
        }
      } else if (view === 'about') {
        this.nav = {
          home: false,
          about: true,
          courseReg: false,
          checkResult: false
        }
      } else if (view === 'course reg') {
        this.nav = {
          home: false,
          about: false,
          courseReg: true,
          checkResult: false
        }
      } else if (view === 'check result') {
        this.nav = {
          home: false,
          about: false,
          courseReg: false,
          checkResult: true
        }
      }
    },
    signOut () {
      localStorage.removeItem('bta_user_token')
      this.logOut().then(_ => {
        this.$router.push('/')
      })
    },
    acceptDataFromHomeTemplate (params) {
      (params.length === 0) ? this.hasNotResgisteredCourses = true : this.hasNotResgisteredCourses = false
    }
  }
}
</script>
