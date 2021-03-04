import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/index.scss'
import { mapState } from 'vuex'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  computed: {
    ...mapState([
      'baseUrl'
    ])
  },
  created () {
    const userAvailable = !!localStorage.getItem('bta_user_token')
    if (userAvailable) {
      this.$store.dispatch('fetchUserDetails', this.baseUrl)
    }
  },
  render: h => h(App)
}).$mount('#app')
