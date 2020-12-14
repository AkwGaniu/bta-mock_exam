export default {
  isAuthenticated: (state) => {
    if (state.isLoggedIn) {
      return state.isLoggedIn
    } else {
      throw new Error()
    }
  }
}
