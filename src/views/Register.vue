<template>
  <div class="register-view-container">

    <div class="register-proper">
      <h3>Basic Tutor Academy</h3>

      <div class="registration-form">
        <span class="error"> {{ error }} </span>
        <form>
          <div class="form-group">
            <label
              for="full-name"
              v-show="animate.name"
            >Full Name</label>
            <input
              type="text"
              autocomplete="off"
              placeholder="Full Name"
              :class="{errorColor: formError.nameError}"
              v-model="formData.names"
              @keyup.enter="Register"
              @keyup="showLabel"
              @blur="animate.name = false"
            >
          </div>

          <div class="form-group">
            <label
              for="matric-num"
              v-show="animate.matric"
            >Matric Number</label>
            <input
              type="text"
              autocomplete="off"
              placeholder="Matric Number"
              :class="{errorColor: formError.matricError}"
              v-model="formData.matricNum"
              @keyup.enter="Register"
              @keyup="showLabel"
              @blur="animate.matric = false"
            >
          </div>

          <div class="form-group">
            <label
              for="department"
              v-show="animate.dept"
            >Department</label>
            <input
              type="text"
              autocomplete="off"
              placeholder="Department"
              :class="{errorColor: formError.deptError}"
              v-model="formData.department"
              @keyup.enter="Register"
              @keyup="showLabel"
              @blur="animate.dept = false"
            >
          </div>

          <div class="form-group">
            <label
              for="email"
              v-show="animate.email"
            >Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              :class="{errorColor: formError.emailError}"
              v-model="formData.email"
              @keyup.enter="Register"
              @keyup="showLabel"
              @blur="animate.email = false"
            >
          </div>

          <div class="form-group">
            <label
              for="phone"
              v-show="animate.phone"
            >Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              :class="{errorColor: formError.phoneError}"
              v-model="formData.phoneNumber"
              @keyup.enter="Register"
              @keyup="showLabel"
              @blur="animate.phone = false"
            >
          </div>

          <div class="form-group">
            <label
              for="password"
              v-show="animate.pass"
            >Password</label>
            <input
              type="password"
              placeholder="Password"
              autocomplete="off"
              :class="{errorColor: formError.password}"
              v-model="formData.password"
              @keyup.enter="Register"
              @keyup="showLabel"
              @blur="animate.pass = false"
            >
          </div>

          <div class="form-group">
            <label
              for="comfirm-password"
              v-show="animate.comfirmPass"
            >Comfirm Password</label>
            <input
              type="password"
              placeholder="Comfirm Password"
              autocomplete="off"
              :class="{errorColor: formError.comfirmPassError}"
              v-model="formData.comfirmPassword"
              @keyup.enter="Register"
              @keyup="showLabel"
              @blur="animate.comfrimPass = false"
            >
          </div>
        </form>

        <button
          class="register-btn"
          ref="btn"
          @click="Register"
        >
          <b-icon
            v-if="processing"
            icon="three-dots"
            animation="cylon"
            font-scale="2"
          ></b-icon>
          <span
            v-else
          >Sign Up</span>
        </button>

        <p class="login-link">Already have an account? <router-link to="/">Login Here</router-link></p>
      </div>

    </div>

    <div class="desc-image">
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      processing: false,
      error: '',
      formData: {
        names: '',
        matricNum: '',
        department: '',
        email: '',
        phoneNumber: '',
        password: '',
        comfirmPassword: ''
      },
      formError: {
        nameError: false,
        matric: false,
        deptError: false,
        emailError: false,
        phoneError: false,
        passError: false,
        comfirmPassError: false
      },
      animate: {
        name: false,
        matric: false,
        dept: false,
        email: false,
        phone: false,
        pass: false,
        comfirmPass: false
      }
    }
  },
  computed: {
    ...mapState([
      'baseUrl'
    ])
  },
  methods: {
    Register () {
      const { names, matricNum, department, email, phoneNumber, password } = this.formData
      if (this.validateFormData()) {
        this.error = ''
        this.$refs.btn.innerHTML = 'Processing...'

        const url = `${this.baseUrl}auth/register`
        const payload = {
          user_type: 'UTSTUD',
          full_name: names,
          matric_number: matricNum,
          department: department,
          email: email,
          phone_number: phoneNumber,
          password: password
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
          this.$refs.btn.innerHTML = 'Sign Up'
          if (data.Error === 0) {
            this.formData = {
              names: '',
              matricNum: '',
              department: '',
              email: '',
              phoneNumber: '',
              password: '',
              comfirmPassword: ''
            }
            localStorage.setItem('registration_successful', JSON.stringify(true))
            this.$router.push('/')
          } else {
            this.error = data.Message
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    showLabel () {
      const animate = this.animate
      this.formData.names === '' ? animate.name = false : animate.name = true
      this.formData.matricNum === '' ? animate.matric = false : animate.matric = true
      this.formData.department === '' ? animate.dept = false : animate.dept = true
      this.formData.email === '' ? animate.email = false : animate.email = true
      this.formData.phoneNumber === '' ? animate.phone = false : animate.phone = true
      this.formData.password === '' ? animate.pass = false : animate.pass = true
      this.formData.comfirmPassword === '' ? animate.comfirmPass = false : animate.comfirmPass = true
    },
    validEmail (email) {
      const regex = /^\S+@\S+\.\S+$/
      if (regex.test(email) === false) {
        return false
      } else {
        return true
      }
    },
    validText (text) {
      const regex = /^[a-zA-Z\s]+$/
      if (regex.test(text) === false) {
        return false
      } else {
        return true
      }
    },
    validNumber (text) {
      const regex = /^[0-9\s]+$/
      if (regex.test(text) === false) {
        return false
      } else {
        return true
      }
    },
    validPhoneNumber (number) {
      const pn = number.split('')
      const nums = [7, 8, 9]
      const numNum = [0, 1]

      if (this.validNumber(number) && pn[0] === '0' && number.length === 11 && numNum.indexOf(Number(pn[2])) >= 0 && nums.indexOf(Number(pn[1])) >= 0) {
        return true
      } else {
        return false
      }
    },
    validateFormData () {
      const { names, matricNum, department, email, phoneNumber, password, comfirmPassword } = this.formData
      console.log(department)
      if (names === '' || matricNum === '' || department === '' || email === '' || phoneNumber === '' || password === '') {
        this.error = 'Please fill out all fields'
        return false
      } else if (!this.validText(names)) {
        this.error = 'Full name field can only be text'
        this.formError.nameError = true
        return false
      } else if (!this.validText(department)) {
        this.error = 'Department field can only be text'
        this.formError.deptError = true
        return false
      } else if (matricNum.length !== 9 || !this.validNumber(matricNum)) {
        this.error = 'Please provide a valid matric number'
        this.formError.matricError = true
      } else if (!this.validEmail(email)) {
        this.error = 'Please provide a valid email'
        this.formError.emailError = true
        return false
      } else if (!this.validPhoneNumber(phoneNumber)) {
        this.error = 'Please provide a valid phone number'
        this.formError.phoneError = true
        return false
      } else if (password.length < 6) {
        this.error = 'Your password cannot be less than 6 characters'
        this.formError.passError = true
        return false
      } else if (password !== comfirmPassword) {
        this.error = 'Password fields does not match'
        this.formError.comfirmPassError = true
        return false
      } else {
        this.formError = {
          nameError: false,
          matric: false,
          deptError: false,
          emailError: false,
          phoneError: false,
          passError: false,
          comfirmPassError: false
        }
        return true
      }
    }
  }
}
</script>
