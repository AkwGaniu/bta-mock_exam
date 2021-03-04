<template>
  <div  v-if="Object.keys(user).length !== 0"  class="home-view-container">
    <UserDetails :userData="userData" />
    <section class="sections time-table">
      <div
        class="not-registered"
        v-if="fetchCourses.length === 0"
      >
        <p>
          Please proceed to register your courses. Registered courses will display here.
        </p>
      </div>
      <div
        class="list-of-course"
        v-else
      >
        <table>
          <thead>
            <th  class="left">Course Title</th>
            <th>Course Code</th>
            <th>Date</th>
            <th  class="right">Action</th>
          </thead>
          <tbody>
            <tr
              v-for="(course, index) in fetchCourses"
              :key="index"
            >
              <td> {{ course.course_title }} </td>
              <td> {{ course.course_code }} </td>
              <td> {{ course.Date }} </td>
              <td >
                <router-link
                  v-if="todayDate === course.Date && !course.taken"
                  :class="[{enabled: todayDate === course.Date}, 'exam-link']"
                  :to="`/instruction/${course.course_code_value}`"
                >
                  {{ course.Action }}
                </router-link>
                <a
                  v-else
                  class="exam-link"
                >
                  {{ course.Action }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import UserDetails from '@/components/UserDetails.vue'
import { currentDate } from '../utils/currentDate'
export default {
  components: {
    UserDetails
  },
  data () {
    return {
      registered: false,
      todayDate: '',
      items: []
    }
  },
  computed: {
    ...mapState([
      'baseUrl',
      'user',
      'todayCourses'
    ]),
    ...mapGetters([
      'fetchCourses',
      'userData'
    ])
  },
  methods: {
    ...mapActions([
      'fetchUserDetails'
    ]),
    passDataToDashboard () {
      setTimeout(() => {
        this.$emit('isRegister', this.fetchCourses)
      }, 1000)
    },
    getCurrentDate () {
      this.todayDate = currentDate()
    }
  },
  created () {
    this.passDataToDashboard()
    this.getCurrentDate()
    this.fetchUserDetails(this.baseUrl)
  }
}
</script>
