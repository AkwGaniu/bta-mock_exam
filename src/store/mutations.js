export default {
  logInSuccess: (state) => {
    state.isLoggedIn = true
  },
  setUserData: (state, payload) => {
    state.user = payload
  },
  logOut: (state) => {
    state.isLoggedIn = false
  }
}
