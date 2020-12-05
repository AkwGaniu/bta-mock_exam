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
        <div class="result-table">
          <div class="head">
            <span class="c-code-head">Course Code</span>
            <span class="unit-head">Unit</span>
            <span class="gp-head">GP</span>
            <span class="c-unit-head">Credit Unit</span>
          </div>
          <div class="head-title">
            <span>2019/2020</span>
            <span>100 Level</span>
          </div>
          <p class="semester">Harmattan:::</p>
          <table>
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="index"
              >
                <td> {{ item.course_code }} </td>
                <td> {{ item.unit }} </td>
                <td> {{ item.gp }} </td>
                <td> {{ item.point }} </td>
              </tr>
            </tbody>
          </table>
          <p class="pre-summary">
            TNU:21 TCP: 90 GP: 4.29 CGPA: 4.54
          </p>
          <p class="summary">
            <b>Summay: CTNUP: 21 CGPA: 4.34 </b> Good Standing
          </p>
        </div>
        <div class="remark-holder">
          <p class="remark"><b>Remark: </b> <br> Some remark to student according to performance</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      noResult: false,
      items: [
        { course_code: 'BIO 101', unit: 3, gp: 5, point: 45 },
        { course_code: 'BIO 101', unit: 3, gp: 5, point: 45 },
        { course_code: 'BIO 101', unit: 3, gp: 5, point: 45 },
        { course_code: 'BIO 101', unit: 3, gp: 5, point: 45 },
        { course_code: 'BIO 101', unit: 3, gp: 5, point: 45 },
        { course_code: 'BIO 101', unit: 3, gp: 5, point: 45 },
        { course_code: 'BIO 101', unit: 3, gp: 5, point: 45 }
      ]
    }
  }
}
</script>
