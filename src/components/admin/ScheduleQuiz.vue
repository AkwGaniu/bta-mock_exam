<template>
  <div class="schedule-quiz-view-container">
    <div class="schedule">
      <div class="course-schedule">
        <div class="form-group">
          <select
            name="courses"
            ref="courses"
            v-model="selectedCourse"
            @change="loadFormData"
          >
            <option value="">Select a course to update its schedule</option>
          <option
            v-for="(course, index) in courses"
            :key="index"
            :value="course.value"
          >
            {{ course.title }}
          </option>
          </select>
        </div>
        <span class="error" > {{ error }} </span>
        <span class="redirect-success-msg"> {{ successMsg }} </span>
        <div
          class="course-details"
          v-if="selectedCourse !== '' "
        >
          <div class="form-group">
            <label for="course title">Course Title</label>
            <input
              type="text"
              class="inputs"
              v-model="formData.title"
              disabled="true"
            />
          </div>
          <div class="form-group">
            <label for="course code">Course Code</label>
            <input
              class="inputs"
              type="text"
              v-model="formData.code"
              disabled="true"
            />
          </div>
          <div class="form-group">
            <label for="date">Exam Date</label>
            <input
              class="inputs"
              type="date"
              v-model="formData.exam_date"
            />
          </div>
          <div class="form-group">
            <label for="duration">Exam Duration</label>
            <input
              class="inputs"
              type="number"
              v-model="formData.duration"
            />
          </div>
          <div class="form-group">
            <input
              class="check-box"
              type="checkbox"
              v-model="formData.show_result"
            /> Release Result <br />
          </div>
          <div class="btn-holder">
            <button
              @click="setExamSchedule"
            > Update Schedule </button>
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
            <tr
              v-for="(course, index) of scheduledExams"
              :key="index"
            >
              <td> {{ course.title }} </td>
              <td> {{ course.exam_date }} </td>
              <td> {{ course.duration }} </td>
              <td> {{ course.show_result }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      userToken: localStorage.getItem('bta_admin_token'),
      error: '',
      successMsg: '',
      selectedCourse: '',
      formData: {
        title: '',
        code: '',
        duration: '',
        exam_date: '',
        show_result: false
      }
    }
  },
  computed: {
    ...mapState([
      'baseUrl',
      'courses',
      'scheduledExams'
    ]),
    ...mapGetters([
      'getSelectedCourse',
      'getSelectedCourseNotFound'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAllCourses',
      'fetchScheduledExams'
    ]),
    convertDate (date) {
      const dateData = date.split(' ')
      const year = dateData[2]
      const month = dateData[0]
      const day = dateData[1].substring(dateData[1].lenght, dateData[1].indexOf(','))
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const newMonthh = months.indexOf(month) + 1
      const newMonth = (newMonthh > 9) ? newMonthh : `0${newMonthh}`
      const formattedDate = `${year}-${newMonth}-${day}`
      return formattedDate
    },
    loadFormData () {
      this.formData = {
        title: '',
        code: '',
        duration: '',
        exam_date: '',
        show_result: false
      }
      const returnedCourse = this.getSelectedCourse(this.selectedCourse)
      if (returnedCourse !== undefined) {
        const newCode = returnedCourse.code.split('_')
        const newCourseCode = `${newCode[0].toUpperCase()} ${newCode[1]}`
        const newDate = this.convertDate(returnedCourse.exam_date)
        this.formData = {
          title: returnedCourse.title,
          code: newCourseCode,
          duration: returnedCourse.duration,
          exam_date: newDate,
          show_result: returnedCourse.show_result
        }
      } else {
        const singleCourse = this.getSelectedCourseNotFound(this.selectedCourse)
        const newCode = singleCourse.value.split('_')
        const newCourseCode = `${newCode[0].toUpperCase()} ${newCode[1]}`
        const end = singleCourse.title.indexOf(' (')
        const newTitle = singleCourse.title.substring(singleCourse.title.lenght, end)
        this.formData = {
          title: newTitle,
          code: newCourseCode,
          duration: '',
          exam_date: '',
          show_result: false
        }
      }
    },
    setExamSchedule () {
      const courseCode = this.selectedCourse
      const duration = this.formData.duration
      const examDate = this.formData.exam_date
      const showResult = this.formData.show_result

      if (courseCode === '') {
        this.error = 'Please select a course to update its schedule'
      } else if (duration === '' || examDate === '') {
        this.error = 'Please fill out all fields before submitting'
      } else {
        this.error = ''
        this.selectedCourse = ''
        this.formData = {
          title: '',
          code: '',
          duration: '',
          exam_date: '',
          show_result: false
        }

        const url = `${this.baseUrl}exam_schedule`
        const payload = {
          course: courseCode,
          exam_date: examDate,
          exam_duration: duration,
          show_result: showResult
        }
        const config = {
          method: 'post',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.userToken}`
          }
        }

        fetch(url, config).then(resp => {
          if (resp.ok) {
            return resp.json()
          } else {
            return Promise.reject
          }
        }).then(data => {
          if (data.Error === 0) {
            this.successMsg = data.Message
            this.$store.commit('updateScheduledCourses', data.data)
          } else {
            this.error = data.Message
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
  created () {
    this.fetchAllCourses(this.baseUrl)
    this.fetchScheduledExams(this.baseUrl)
  }
}
</script>
