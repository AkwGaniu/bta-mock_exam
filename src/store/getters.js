export default {
  isAuthenticated: (state) => {
    if (state.isLoggedIn) {
      return state.isLoggedIn
    } else {
      return false
    }
  },
  isAdminAuthenticated: (state) => {
    if (state.isAdminLoggedIn) {
      return state.isAdminLoggedIn
    } else {
      return false
    }
  },
  userData: (state) => {
    return state.user.user
  },
  fetchCourses: (state) => {
    const courses = []
    if (Object.keys(state.user).length !== 0) {
      for (let i = 0; i < state.user.courses.length; i++) {
        let courseCode = state.user.courses[i].course_code
        courseCode = courseCode.split('_')
        const newCourseCode = `${courseCode[0]} ${courseCode[1]}`
        const singleCourse = {
          course_title: state.user.courses[i].course_title,
          course_code: newCourseCode.toUpperCase(),
          course_code_value: state.user.courses[i].course_code,
          Date: (state.user.courses[i].Date) ? state.user.courses[i].Date : 'Not Yet Scheduled',
          taken: state.user.courses[i].taken,
          Action: 'Take Quiz'
        }
        courses.push(singleCourse)
      }
    }
    return courses
  },
  questions: (state) => {
    if (state.questions.length > 0) {
      for (const ques in state.questions) {
        state.questions[ques].selected = ''
      }
      return state.questions
    }
  },
  getCourseData: (state) => (courseCode) => {
    return state.user.courses.find((course) => course.course_code === courseCode)
  }
}
