<template>
  <div  v-if="Object.keys(user).length !== 0"  class="result-checker-view-container">
     <UserDetails :userData="userData" />
    <div class="sections">
      <div
        class="no-result"
        v-if="noResult"
      >
        <p>
          Sorry, you have not taken any exam yet. Hence, no resut for now.
        </p>
      </div>
      <div
        v-else
        class="result-holder"
      >
        <div class="result-table">
          <div class="head">
            <span class="c-code-head">Course Code</span>
            <span class="unit-head">Unit</span>
            <span class="gp-head">GP</span>
            <span class="c-unit-head">Credit Unit</span>
          </div>
          <div class="head-title">
            <span>2019/2020</span>
            <span>100 Level</span>
          </div>
          <p class="semester">Harmattan:::</p>
          <table>
            <tbody>
              <tr
                v-for="(item, index) in results.courses"
                :key="index"
              >
                <td> {{ item.course_code }} </td>
                <td> {{ item.course_unit }} </td>
                <td> {{ item.grade_point }} </td>
                <td> {{ item.credit_unit }} </td>
              </tr>
            </tbody>
          </table>
          <p class="pre-summary">
            TNU: {{ results.TNU }} TCP: {{ results.TCP}} GP: {{ results.GP }} CGPA: {{ results.CGPA}}
          </p>
          <p class="summary">
            <b>Summay: CTNUP:  {{ results.CTNUP }} CGPA:  {{ results.CGPA }} </b>  {{ results.remark }}
          </p>
        </div>
        <div class="remark-holder">
          <p class="remark"><b>Remark: </b> <br> {{ results.remark }} </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

import UserDetails from '@/components/UserDetails.vue'
export default {
  components: {
    UserDetails
  },
  data () {
    return {
      noResult: false,
      results: Object
    }
  },
  computed: {
    ...mapState([
      'baseUrl',
      'user'
    ]),
    ...mapGetters([
      'userData'
    ])
  },
  created () {
    const userToken = localStorage.getItem('bta_user_token')
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }

    fetch(`${this.baseUrl}fetch_result`, config).then(resp => {
      if (resp.ok) {
        return resp.json()
      }
    }).then(data => {
      if (data.Error !== 0) {
        this.noResult = true
      } else {
        this.results = data.data
      }
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
