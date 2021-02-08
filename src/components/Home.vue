<template>
  <div  v-if="Object.keys(user).length !== 0"  class="home-view-container">
      <div class="sections student-profile">
       <div class="user-top">
          <p class="name">
           <b-icon
            class="icon"
            icon="person"
            font-scale="1.2"
          ></b-icon>
          <span> {{ userData.full_name }} </span>
        </p>
        <p class="matric">
          <b-icon
            class="icon"
            icon="layers"
            font-scale="1.2"
          ></b-icon>
          <span> {{ userData.matric_number }} </span>
        </p>
       </div>
       <div class="user-bottom">
        <p class="dept">
          <b-icon
            class="icon"
            icon="bookmarks"
            font-scale="1.2"
          ></b-icon>
          <span> {{ userData.department }} </span>
        </p>
        <p class="level">
           <b-icon
            class="icon"
            icon="sort-up"
            font-scale="1.2"
          ></b-icon>
          <span>100 Level</span>
        </p>
       </div>
      </div>
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
        class="list-of-coourse"
        v-else
      >
        <table>
          <thead>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Date</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr
              v-for="(course, index) in fetchCourses"
              :key="index"
            >
              <td> {{ course.course_title }} </td>
              <td> {{ course.course_code }} </td>
              <td> {{ course.Date }} </td>
              <td class="exam-link">
                <router-link
                  :to="`/nstruction/${course.course_code}`"
                >
               {{ course.Action }}
            </router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      registered: false,
      items: []
    }
  },
  computed: {
    ...mapState([
      'baseUrl',
      'user'
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
      }, 500)
    },
    currentDate () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDay()
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const formattedDate = `${months[month - 1]} ${day}, ${year}`
      return formattedDate
    }
  },
  mounted () {
    this.fetchUserDetails(this.baseUrl)
    this.passDataToDashboard()
    this.currentDate()
  }
}
</script>
