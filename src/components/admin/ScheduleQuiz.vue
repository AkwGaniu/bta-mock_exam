<template>
  <div class="schedule-quiz-view-container">
    <h2>Quiz Schedule</h2>
    <div class="schedule">
      <div class="course-schedule">
        <div class="form-group">
          <select name="courses" ref="courses">
            <option value="">Select a course to update its schedule</option>
            <option
              v-for="(course, index) in [1, 2, 3, 4, 5]"
              :key="index"
              value="course"
            >
              CSC 101
            </option>
          </select>
        </div>
        <div class="course-details">
          <div class="form-group">
            <label for="course title">Course Title</label>
            <input
              type="text"
              class="inputs"
              value="Introduction to computer"
              disabled="true"
            />
          </div>
          <div class="form-group">
            <label for="course code">Course Code</label>
            <input class="inputs" type="text" value="CSC 101" disabled="true" />
          </div>
          <div class="form-group">
            <label for="date">Exam Date</label>
            <input class="inputs" type="date" value="" />
          </div>
          <div class="form-group">
            <label for="duration">Exam Duration</label>
            <input class="inputs" type="number" value="" />
          </div>
          <div class="form-group">
            <!-- <label for="release result">Release Result</label> -->
            <input class="check-box" type="checkbox" value="true" /> Release Result <br />
          </div>
          <div class="btn-holder">
            <button> Update Schedule </button>
          </div>
        </div>
      </div>
      <div class="list-of-course">
        <table>
          <thead>
            <th class="left">Course Title</th>
            <th>Exam Date</th>
            <th>Exam Duration</th>
            <th class="right">Release Result</th>
          </thead>
          <tbody>
            <tr>
              <td>course.course_title</td>
              <td>course.course_code</td>
              <td>course.Date</td>
              <td>course.Date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {}
}
</script>
