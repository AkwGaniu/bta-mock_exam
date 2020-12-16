export default {
  isAuthenticated: (state) => {
    if (state.isLoggedIn) {
      return state.isLoggedIn
    } else {
      throw new Error()
    }
  },
  testAvailable: (state) => {
    if (state.testAvailable) {
      return true
    } else {
      throw new Error()
    }
  },
  questions: (state) => {
    for (const ques in state.questions) {
      state.questions[ques].selected = ''
    }
    return state.questions
  }
}
