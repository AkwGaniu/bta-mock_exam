<template>
  <div class="upload-question-view-container">
    <div
      class="upload-question sections"
      id="error"
    >
      <span class="error" > {{ error }} </span>
      <div class="form-holder">
        <label for="courses">Choose Course</label>
        <select class="input" v-model="selected">
          <option value="#" selected disabled="disabled">
            Select a course to upload questions for it
          </option>
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >
            {{ option.title }}
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
export default {
  data () {
    return {
      error: '',
      selected: '#',
      options: [],
      formData: {
        questions: '',
        options: '',
        answers: ''
      }
    }
  },
  methods: {
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

        const url = ''
        const payload = {
          token: 'dfdkfdfsklkfsdfsdkf.dsf;dsf',
          questions: question,
          options: option,
          answers: answer
        }
        console.log(payload)
        const config = {
          method: 'post',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' }
        }

        fetch(url, config).then(resp => {
          if (resp.ok) {
            return resp.json()
          }
        }).then(data => {
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
  created () {
    const config = {
      method: 'get',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYnJlOEljbCFkdzJoU1A3NGc2M2giLCJ1c2VyX3R5cGUiOiJVVFNUVUQiLCJtYXRyaWNfbnVtYmVyIjoiMTcwNTkxMDk2In0.BLog3ZvJUVyuB9Z_rjEALIkhKgz4fR-1UOcxG94rRnA'
      }
    }
    fetch('http://localhost:8000/fetch_courses', config).then(resp => {
      if (resp.ok) {
        return resp.json()
      }
    }).then(data => {
      this.options = data.data
      console.log(this.options)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
