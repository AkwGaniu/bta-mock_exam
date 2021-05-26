<template>
  <div class="login-view-container">
    <div class="desc-image">
    </div>
    <div class="login-proper">
      <div class="logo">
        <img src="../assets/BTA.png" alt="BTA LOGO">
      </div>
      <div class="login-form">
        <span class="redirect-error"> {{ error }} </span>
        <span class="redirect-success-msg"> {{ successMsg }} </span>
        <form>
          <div class="form-group">
            <label
              for="matric-num"
              v-show="matricLabel"
            >Matric Number</label>
            <input
              :class="{errorColor: formError.matric}"
              type="text"
              autocomplete="off"
              placeholder="Matric Number"
              ref="matricField"
              v-model="formData.matricNum"
              @keyup.enter="tryLogIn"
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
              autocomplete="off"
              ref="passwordField"
              v-model="formData.password"
              @keyup.enter="tryLogIn"
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
          @click="tryLogIn"
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
        <p class="reg-link">
          New BTA studdent?
          <router-link to="/register">Create Account</router-link>
           |
          <router-link to="/admin">Admin</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      error: '',
      successMsg: '',
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
  beforeRouteEnter (to, from, next) {
    if (from.name === 'register' && !!localStorage.getItem('registration_successful')) {
      next(vm => {
        vm.successMsg = 'Registration successful, Please Sign In'
        localStorage.removeItem('registration_successful')
        setTimeout(() => {
          vm.successMsg = ''
        }, 5000)
      })
    } else {
      next()
    }
  },
  computed: {
    ...mapState([
      'baseUrl'
    ])
  },
  methods: {
    ...mapActions([
      'logIn'
    ]),
    tryLogIn () {
      const { matricNum, password } = this.formData
      if (matricNum === '') {
        this.formError.matric = true
        this.matricError = 'Please provide your matric number'
      } else if (password === '') {
        this.formError.password = true
        this.passwordError = 'please provide your password'
      } else {
        this.processing = true
        this.formError.matric = false
        this.formError.password = false
        this.matricError = ''
        this.passwordError = ''
        //
        const payload = {
          matric_number: matricNum,
          password: password
        }
        const url = `${this.baseUrl}auth/login`
        const config = {
          method: 'post',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' }
        }

        fetch(url, config).then(resp => {
          if (resp.ok) {
            return resp.json()
          } else {
            return Promise.reject
          }
        }).then(data => {
          this.processing = false
          if (data.Error !== 0) {
            this.error = data.Message
          } else {
            this.formData = {
              matricNum: '',
              password: ''
            }
            if (localStorage.getItem('bta_admin_token') !== null) {
              localStorage.removeItem('bta_admin_token')
            }
            localStorage.setItem('bta_user_token', data.data.token)
            this.logIn().then(() => {
              this.$router.push('/dashboard')
            })
          }
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
