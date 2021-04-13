export default {
  logIn: ({ commit }) => {
    commit('logInSuccess')
  },
  fetchUserDetails: ({ commit }, baseUrl) => {
    const userToken = localStorage.getItem('bta_user_token')
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    fetch(`${baseUrl}fetch_user_details`, config).then(resp => {
      if (resp.ok) {
        return resp.json()
      }
    }).then(data => {
      if (data.Error === 0) {
        commit('setUserData', data.data)
      } else if (data.Message === 'Token expired') {
        self.location = '/'
      }
    }).catch(error => {
      console.log(error)
    })
  },
  toggleTestAvailable: ({ commit }) => {
    commit('toggleTestAvailable')
  },
  fetchExamQuestions: ({ commit }, payload) => {
    const userToken = localStorage.getItem('bta_user_token')
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    fetch(`${payload.baseUrl}fetch_quiz_questions?course_code=${payload.courseCode}`, config).then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        return Promise.reject
      }
    }).then(data => {
      console.log(data)
      if (data.Error === 0) {
        commit('setQuestionsToState', data.data)
      } else {
        self.location = '/'
      }
    }).catch(error => {
      console.log(error)
    })
  },
  fetchAllCourses: ({ commit }, baseUrl) => {
    const userToken = localStorage.getItem('bta_admin_token')
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    fetch(`${baseUrl}fetch_courses`, config).then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        return Promise.reject
      }
    }).then(data => {
      commit('setCourses', data.data)
    }).catch(error => {
      console.log(error)
      self.location = '/admin'
    })
  },
  fetchScheduledExams ({ commit }, baseUrl) {
    const userToken = localStorage.getItem('bta_admin_token')
    const config = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    fetch(`${baseUrl}fetch_scheduled_exams`, config).then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        return Promise.reject
      }
    }).then(data => {
      commit('setScheduledCourses', data.data)
      // console.log(this.scheduledExams)
    }).catch(error => {
      console.log(error)
    })
  },
  logOut: ({ commit }) => {
    return new Promise(resolve => {
      commit('logOut')
      resolve()
    })
  }
}
