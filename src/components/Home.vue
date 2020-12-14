<template>
  <div class="home-view-container">
      <div class="sections student-profile">
       <div class="user-top">
          <p class="name">
           <b-icon
            class="icon"
            icon="person"
            font-scale="1.2"
          ></b-icon>
          <span> {{ user.name }} </span>
        </p>
        <p class="matric">
          <b-icon
            class="icon"
            icon="layers"
            font-scale="1.2"
          ></b-icon>
          <span> {{ user.matricNum }} </span>
        </p>
       </div>
       <div class="user-bottom">
        <p class="dept">
          <b-icon
            class="icon"
            icon="bookmarks"
            font-scale="1.2"
          ></b-icon>
          <span> {{ user.dept }} </span>
        </p>
        <p class="level">
           <b-icon
            class="icon"
            icon="sort-up"
            font-scale="1.2"
          ></b-icon>
          <span> {{ user.level }} </span>
        </p>
       </div>
      </div>
    <section class="sections time-table">
      <div
        class="not-registered"
        v-if="!registeredForCourses"
      >
        <p>
          Please proceed to register your courses. Registered courses will display here.
        </p>
      </div>
      <div
        class="list-of-coourse"
        v-else
      >
        <b-table striped :items="items">
           <template #cell(Action)="data">
            <router-link
              class="exam-link"
              :to="`/instruction/${data.value}`"
            >
              {{ data.value }}
            </router-link>
          </template>
        </b-table>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    registeredForCourses: Boolean
  },
  data () {
    return {
      items: [
        { Corse_title: 40, course_code: 'Dickerson', Date: 'Macdonald', Action: 'action' },
        { Corse_title: 40, course_code: 'Dickerson', Date: 'Macdonald', Action: 'action' },
        { Corse_title: 40, course_code: 'Dickerson', Date: 'Macdonald', Action: 'action' },
        { Corse_title: 40, course_code: 'Dickerson', Date: 'Macdonald', Action: 'action' },
        { Corse_title: 40, course_code: 'Dickerson', Date: 'Macdonald', Action: 'action' },
        { Corse_title: 40, course_code: 'Dickerson', Date: 'Macdonald', Action: 'action' },
        { Corse_title: 40, course_code: 'Dickerson', Date: 'Macdonald', Action: 'action' }
      ]
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'setUserDetails'
    ])
  },
  created () {
    const payload = {
      name: 'Shodipo Uthman Oluwaseto',
      matricNum: 170591096,
      level: '100 Level',
      dept: 'Computer Science'
    }

    this.setUserDetails(payload)
  }
}
</script>
