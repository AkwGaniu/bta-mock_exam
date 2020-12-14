export default {
  logIn: ({ commit }, payload) => {
    commit('initLogin') // NOW I CAN ADD A SPINNER
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem('bta_user_token', 'hhldsf8efndfkdfsffjsksfksdpjffdsjfdkfsd')
        commit('logInSuccess', payload)
        resolve()
      }, 1000)
    })
    // const url = ''
    // const config = {
    //   method: 'post',
    //   body: JSON.stringify(payload),
    //   headers: { 'Content-Type': 'application/json' }
    // }

    // fetch(url, config).then(resp => {
    //   if (resp.ok) {
    //     return resp.json()
    //   }
    // }).then(data => {
    //   console.log(data)
    //   commit('addUser', data)
    // }).catch(error => {
    //   console.log(error)
    // })
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
