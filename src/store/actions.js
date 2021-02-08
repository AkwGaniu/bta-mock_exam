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
      } else {
        throw data.Message
      }
    }).catch(error => {
      console.log(error)
    })
  },
  logOut: ({ commit }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.removeItem('bta_user_token')
        commit('logOut')
        resolve()
      })
    })
  }
}
