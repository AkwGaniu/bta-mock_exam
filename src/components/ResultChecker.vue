<template>
  <div class="result-checker-view-container">
    <div class="sections student-profile">
    <div class="user-top">
        <p class="name">
        <b-icon
          class="icon"
          icon="person"
          font-scale="1.2"
        ></b-icon>
        <span>Shodipo Uthman Oluwseto</span>
      </p>
      <p class="matric">
        <b-icon
          class="icon"
          icon="layers"
          font-scale="1.2"
        ></b-icon>
        <span>160548796</span>
      </p>
    </div>
    <div class="user-bottom">
              <p class="dept">
        <b-icon
          class="icon"
          icon="bookmarks"
          font-scale="1.2"
        ></b-icon>
        <span>Computer Science</span>
      </p>
      <p class="level">
        <b-icon
          class="icon"
          icon="sort-up"
          font-scale="1.2"
        ></b-icon>
        <span>400L</span>
      </p>
    </div>
    </div>
    <div class="sections">
      <div
        class="no-result"
        v-if="noResult"
      >
        <p>
          Sorry, you have not taken any exam yet. Hence, no resut for now.
        </p>
      </div>
      <div
        v-else
        class="result-holder"
      >
        <h2>Result</h2>
        <div class="result-table">
          <b-table striped hover :items="items"></b-table>
        </div>
        <div class="remark-holder">
          <p class="remark"><b>Remark: </b> Some remark to student according to performance</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      noResult: true,
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
  }
}
</script>
