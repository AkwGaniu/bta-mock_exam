<template>
  <div class="mobile-nav-modal-view-contaner">
    <div class="menus">
      <ul>
        <li
          :class="{selected: view.upload}"
          @click="navigateView('upload'); toggleMobileNav()"
        >Upload Question</li>
        <li
          :class="{selected: view.schedule}"
          @click="navigateView('schedule'); toggleMobileNav()"
        >Schedule Quiz</li>
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
    navigateView: Function,
    signOut: Function,
    view: Object
  }
}
</script>
