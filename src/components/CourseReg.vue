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
              {{ option.text }}
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
              {{ option.text }}
            </b-form-checkbox>
          </b-form-group>
        </div>
      </div>
      <button
        class="submit-btn"
        @click="submitCourse"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      error: '',
      selected: [], // Must be an array reference!
      options1: [
        { text: 'Computational Science (CSC 345)', value: 'A', disabled: false },
        { text: 'Computational Science (CSC 345)', value: 'B', disabled: false },
        { text: 'Computational Science (CSC 345)', value: 'C', disabled: false },
        { text: 'Computational Science (CSC 345)', value: 'dsds', disabled: true },
        { text: 'Computational Science (CSC 345)', value: 'E', disabled: false }
      ],
      options2: [
        { text: 'Computational Science (CSC 345)', value: 'Ahhhj', disabled: false },
        { text: 'Computational Science (CSC 345)', value: 'Bhjh', disabled: false },
        { text: 'Computational Science (CSC 345)', value: 'Chhgkgj', disabled: false },
        { text: 'Computational Science (CSC 345)', value: 'hdhdk', disabled: true },
        { text: 'Computational Science (CSC 345)', value: 'Ejgkhgg', disabled: false }
      ]
    }
  },
  methods: {
    submitCourse () {
      const selectedCourses = this.selected.length
      if (selectedCourses < 7) {
        this.error = 'Please select 7 courses for registration'
      } else if (selectedCourses > 7) {
        this.error = 'You cannoot register more than 7 courses'
      } else {
        this.error = ''
        console.log(this.selected)
        const url = ''
        const payload = {
          selectedCourses: this.selected
        }
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
  }
}
</script>
