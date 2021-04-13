<template>
  <div class="upload-question-view-container">
    <div
      class="upload-question sections"
      id="error"
    >
      <span class="error" > {{ error }} </span>
      <span class="redirect-success-msg"> {{ successMsg }} </span>
      <div class="form-holder">
        <label for="courses">Choose Course</label>
        <select class="input" v-model="selected">
          <option value="#" selected disabled="disabled">
            Select a course to upload questions for it
          </option>
          <option
            v-for="(course, index) in courses"
            :key="index"
            :value="course.value"
          >
            {{ course.title }}
          </option>
        </select>
      </div>
      <div class="form-holder">
        <label for="questions">Questions</label>
        <textarea
          class="input"
          name="question"
          v-model="formData.questions"
          rows="4"
          placeholder="Type or paste questions here"
        ></textarea>
      </div>
      <div class="form-holder">
        <label for="options">Options</label>
        <textarea
          class="input"
          name="question"
          v-model="formData.options"
          rows="4"
          placeholder="Type or paste options here"
        ></textarea>
      </div>
      <div class="form-holder">
        <label for="answers">Answers</label>
        <textarea
          class="input"
          name="question"
          v-model="formData.answers"
          rows="4"
          placeholder="Type or paste answers here"
        ></textarea>
      </div>
      <div class="form-holder">
        <a
          href="#error"
          @click="submitQuestions"
        >
          Submit
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      userToken: localStorage.getItem('bta_admin_token'),
      error: '',
      successMsg: '',
      selected: '#',
      formData: {
        questions: '',
        options: '',
        answers: ''
      }
    }
  },
  computed: {
    ...mapState([
      'baseUrl',
      'courses'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAllCourses'
    ]),
    submitQuestions () {
      const question = this.formData.questions
      const option = this.formData.options
      const answer = this.formData.answers
      if (this.selected === '#') {
        this.error = 'Please select a course before uploading questions'
      } else if (question === '' || option === '' || answer === '') {
        this.error = 'Please fill out all fields before submitting'
      } else {
        this.error = ''
        this.selected = '#'
        this.formData = {
          questions: '',
          options: '',
          answers: ''
        }

        const url = `${this.baseUrl}upload_questions`
        const payload = {
          course: this.selected,
          question: question,
          options: option,
          answer: answer
        }
        console.log(payload)
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
          } else {
            this.error = data.Message
          }
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
  created () {
    this.fetchAllCourses(this.baseUrl)
  }
}
</script>
