<template>
  <div class="dashboard-view-container">
    <div class="nav-head">
      <div class="logo-holder">
        <div class="logo">
          <router-link to="/dashboard">
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
          <router-link to="/dashboard">
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
            v-if="!registeredForCourses"
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
        <CourseReg
          v-show="nav.courseReg"
        ></CourseReg>
        <ResultChecker
          v-show="nav.checkResult"
        ></ResultChecker>
        <Home
          v-show="nav.home"
          :registeredForCourses="registeredForCourses"
        ></Home>
        <About
          v-show="nav.about"
        ></About>
      </section>
    </main>
    <MobileNavModal
      v-show="showMobileNav"
      :toggleMobileNav="toggleMobileNav"
      :toggleView="toggleView"
      :nav="nav"
      :signOut="signOut"
      :registeredForCourses="registeredForCourses"
    ></MobileNavModal>
  </div>
</template>

<script>
import CourseReg from '@/components/CourseReg.vue'
import ResultChecker from '@/components/ResultChecker.vue'
import MobileNavModal from '@/components/MobileNavModal.vue'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

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
      registeredForCourses: true,
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
  methods: {
    toggleMobileNav () {
      this.showMobileNav = !this.showMobileNav
      if (this.showMobileNav) {
        document.documentElement.style.overflowY = 'hidden'
      } else {
        document.documentElement.style.overflowY = 'scroll'
      }
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
      self.location = '/'
    }
  }
}
</script>
