<template>
  <div class="mobile-nav-modal-view-contaner">
    <div class="menus">
      <ul>
        <li
          :class="{selected: nav.home}"
          @click="toggleView('home'); toggleMobileNav()"
        >Home</li>
        <li
            v-if="hasNotResgisteredCourses"
          :class="{selected: nav.courseReg}"
          @click="toggleView('course reg'); toggleMobileNav()"
        >Course Registration</li>
        <li
          :class="{selected: nav.checkResult}"
          @click="toggleView('check result'); toggleMobileNav()"
        >Check Result</li>
        <li
          :class="{selected: nav.about}"
          @click="toggleView('about'); toggleMobileNav()"

        >About</li>
        <li
          @click="signOut"
        >Sign Out</li>
      </ul>
    </div>
    <div
      class="close-modal"
      @click="toggleMobileNav"
    >
      <span
        class="close"
      >
        +
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    toggleMobileNav: Function,
    toggleView: Function,
    signOut: Function,
    nav: Object,
    hasNotResgisteredCourses: Boolean
  }
}
</script>
