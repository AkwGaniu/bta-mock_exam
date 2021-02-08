export default {
  user: Object,
  // baseUrl: 'https://bta-backend.herokuapp.com/',
  baseUrl: 'http://localhost:8000/',
  pending: false,
  isLoggedIn: !!localStorage.getItem('bta_user_token'),
  questions: [],
  testAvailable: false
}
