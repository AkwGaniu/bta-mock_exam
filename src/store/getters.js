export default {
  isAuthenticated: (state) => {
    if (state.isLoggedIn) {
      return state.isLoggedIn
    } else {
      throw new Error()
    }
  },
  userData: (state) => {
    return state.user.user
  },
  fetchCourses: (state) => {
    const courses = []
    for (let i = 0; i < state.user.courses.length; i++) {
      let courseCode = state.user.courses[i].course_code
      courseCode = courseCode.split('_')
      const newCourseCode = `${courseCode[0]} ${courseCode[1]}`
      const singleCourse = {
        course_title: state.user.courses[i].course_title,
        course_code: newCourseCode.toUpperCase(),
        Date: (state.user.courses[i].Date) ? state.user.courses[i].Date : 'Not Yet Scheduled',
        Action: 'Take Quiz'
      }
      courses.push(singleCourse)
    }
    return courses
  }
}
