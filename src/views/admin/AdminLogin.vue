<template>
  <div class="login-view-container">
    <div class="admin-desc-image">
    </div>
    <div class="login-proper">
      <div class="login-form">
        <h1>Admin LogIn</h1>
        <form>
          <div class="form-group">
            <label
              for="matric-num"
              v-show="matricLabel"
            >User Name</label>
            <input
              :class="{errorColor: formError.matric}"
              type="text"
              autocomplete="off"
              placeholder="User Name"
              ref="matricField"
              v-model="formData.matricNum"
              @keyup.enter="logIn"
              @keyup="showLabel"
              @blur="matricLabel = false"
            >
            <span class="error"> {{ matricError }} </span>
          </div>
          <div class="form-group">
            <label
              for="password"
              v-show="passwordLabel"
            >Password</label>
            <input
              :class="{errorColor: formError.password}"
              type="password"
              placeholder="Password"
              ref="passwordField"
              v-model="formData.password"
              @keyup.enter="logIn"
              @keyup="showLabel"
              @blur="passwordLabel = false"
            >
            <span class="error"> {{ passwordError }} </span>
          </div>
          <router-link class="forgot-password" to="#">Forgot password?</router-link>
         </form>
        <button
          class="sign-in-btn"
          ref="btn"
          @click="logIn"
        >
          <b-icon
            v-if="processing"
            icon="three-dots"
            animation="cylon"
            font-scale="2"
          ></b-icon>
          <span
            v-else
          >Sign In</span>
        </button>
        <p class="reg-link">Have no account? <router-link to="#">Contact BTA</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      processing: false,
      matricLabel: false,
      passwordLabel: false,
      matricError: '',
      passwordError: '',
      formData: {
        matricNum: '',
        password: ''
      },
      formError: {
        matric: false,
        password: false
      }
    }
  },
  methods: {
    logIn () {
      const { matricNum, password } = this.formData

      if (matricNum === '') {
        this.formError.matric = true
        this.matricError = 'Please provide your matric number'
      } else if (password === '') {
        this.formError.password = true
        this.passwordError = 'please provide your password'
      } else {
        this.matricError = ''
        this.passwordError = ''
        this.Processing = true
        this.formError.matric = false
        this.formError.password = false
        this.formData = {
          matricNum: '',
          password: ''
        }

        self.location = '/index'
        const url = ''
        const payload = {
          matricNum: matricNum,
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
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    showLabel () {
      this.formData.matricNum === '' ? this.matricLabel = false : this.matricLabel = true
      this.formData.password === '' ? this.passwordLabel = false : this.passwordLabel = true
    }
  },
  watch: {
    // matricLabel: {
    //   immediate: true,
    //   handler () {
    //     this.formData.matricNum === '' ? this.matricLabel = false : console.log('jjj')
    //   }
    // }
  }

}
</script>
