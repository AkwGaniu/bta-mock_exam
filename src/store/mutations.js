import { currentDate } from '../utils/currentDate'
export default {
  toggleTestAvailable: (state) => {
    state.testAvailable = !state.testAvailable
  },
  logInSuccess: (state, payload) => {
    state.pending = false
    state.isLoggedIn = true
  },
  setUserData: (state, payload) => {
    const date = currentDate()
    const todayCourses = []
    for (const course of payload.courses) {
      if (date === course.Date) {
        todayCourses.push(course.course_code)
      }
    }
    state.user = payload
    state.todayCourses = todayCourses
  },
  setQuestionsToState: (state, payload) => {
    state.questions = payload
  },
  setCourses: (state, payload) => {
    state.courses = payload
  },
  setScheduledCourses: (state, payload) => {
    state.scheduledExams = payload
  },
  updateScheduledCourses: (state, payload) => {
    state.scheduledExams = payload
  },
  logOut: (state) => {
    state.isLoggedIn = false
  }
}
