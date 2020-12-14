export default {
  logInSuccess: (state, payload) => {
    state.pending = false
    state.isLoggedIn = true
    state.user = payload
  },
  initLogin: (state) => {
    state.pending = true
  },
  logOut: (state) => {
    state.isLoggedIn = false
  }
}
