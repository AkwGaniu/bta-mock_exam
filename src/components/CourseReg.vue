<template>
  <div class="course-reg-view-container">
    <h2>Course Registration</h2>
    <div class="holder">
      <span class="error"> {{ error }} </span>
      <div class="sections">
        <div class="left">
          <b-form-group label="">
            <b-form-checkbox
              v-for="option in options1"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              name="flavour-3a"
            >
              {{ option.title }}
            </b-form-checkbox>
          </b-form-group>
        </div>
        <div class="right">
          <b-form-group label="">
            <b-form-checkbox
              v-for="option in options2"
              v-model="selected"
              :key="option.value"
              :value="option.value"
              name="flavour-3a"
            >
              {{ option.title }}
            </b-form-checkbox>
          </b-form-group>
        </div>
      </div>
      <button
        class="submit-btn"
        @click="submitCourse"
      >
        <b-icon
          v-if="processing"
          icon="three-dots"
          animation="cylon"
          font-scale="2"
        ></b-icon>
        <span
          v-else
        >Register Courses</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      error: '',
      processing: false,
      selected: [],
      options1: [],
      options2: []
    }
  },
  computed: {
    ...mapState([
      'baseUrl'
    ])
  },
  methods: {
    submitCourse () {
      const selectedCourses = this.selected.length
      if (selectedCourses < 7) {
        this.error = 'Please select 7 courses for registration'
      } else if (selectedCourses > 7) {
        this.error = 'You cannot register more than 7 courses'
      } else {
        this.error = ''
        this.processing = true
        const url = `${this.baseUrl}course_registration`
        const payload = {
          selected_courses: this.selected
        }
        const userToken = localStorage.getItem('bta_user_token')
        const config = {
          method: 'post',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }

        fetch(url, config).then(resp => {
          if (resp.ok) {
            return resp.json()
          }
        }).then(data => {
          this.processing = true
          if (data.Error === 0) {
            // location.reload()
            this.$router.push('/')
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
    const userToken = localStorage.getItem('bta_user_token')
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    fetch(`${this.baseUrl}fetch_courses`, config).then(resp => {
      if (resp.ok) {
        return resp.json()
      }
    }).then(data => {
      for (let i = 0; i < data.data.length; i++) {
        if (i < 5) {
          this.options1.push(data.data[i])
        } else {
          this.options2.push(data.data[i])
        }
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
