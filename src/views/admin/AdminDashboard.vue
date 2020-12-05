<template>
  <div class="admin-dashboard-view-container">
    <div class="nav-head">
      <div class="logo-holder">
        <div class="logo">
          <router-link to="/index">
            <img src="../../assets/BTA11.png" alt="BTA LOGO">
          </router-link>
        </div>
      </div>
      <div class="about-admin">
        <p>Admin464827</p>
        <div class="avatar">
          <!-- <img src="#" alt="Avatar"> -->
        </div>
      </div>
    </div>
    <main class="main-container">
      <div class="menus">
        <ul>
          <li
            :class="{selected: view.upload}"
            @click="navigateView('upload')"
          >Upload Question</li>
          <li
            :class="{selected: view.schedule}"
            @click="navigateView('schedule')"
          >Schedule Quiz</li>
          <li
            @click="signOut"
          >Sign Out</li>
        </ul>
      </div>
      <section class="details">
        <UploadQuestion
          v-show="view.upload"
        ></UploadQuestion>
        <ScheduleQuiz
          v-show="view.schedule"
        ></ScheduleQuiz>
        <Home
          v-show="view.home"
        ></Home>
      </section>
    </main>
  </div>
</template>
<script>
import UploadQuestion from '../../components/admin/UploadQuestion.vue'
import ScheduleQuiz from '../../components/admin/ScheduleQuiz.vue'
import Home from '../../components/admin/AdminHome.vue'
export default {
  components: {
    UploadQuestion,
    ScheduleQuiz,
    Home
  },
  data () {
    return {
      view: {
        upload: false,
        schedule: false,
        home: true
      }
    }
  },
  methods: {
    navigateView (view) {
      if (view === 'upload') {
        this.view = {
          upload: true,
          schedule: false,
          home: false
        }
      } else if (view === 'schedule') {
        this.view = {
          upload: false,
          schedule: true,
          home: false
        }
      } else {
        this.view = {
          upload: false,
          schedule: false,
          home: true
        }
      }
    },
    signOut () {
      self.location = '/admin'
    }
  }
}
</script>
