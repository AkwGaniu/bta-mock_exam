export default {
  toggleTestAvailable: (state) => {
    state.testAvailable = !state.testAvailable
  },
  logInSuccess: (state, payload) => {
    state.pending = false
    state.isLoggedIn = true
  },
  setUserData: (state, payload) => {
    state.user = payload
  },
  logOut: (state) => {
    state.isLoggedIn = false
  }
}
