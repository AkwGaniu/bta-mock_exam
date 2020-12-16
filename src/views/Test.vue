<template>
  <div class="test-view-container">
    <h1 class="title">LASU FIRST SEMESTER MOCK EXAMINATION</h1>
    <div class="upper-section">
      <div class="student-details">
        <p class="name">Sodipo Uthman Oluwaseto</p>
        <p class="matric">170591939</p>
      </div>
      <h1>LASU FIRST SEMESTER MOCK EXAMINATION</h1>
      <div class="timer">
        <p><b>Time left: </b> <span ref="timerContainer"> 00:00 </span> </p>
      </div>
    </div>
    <div class="lower-section">
      <div class="question-tracker">
        <span
          v-for="(question, index) in questions"
          :key="index"
          :class="[{currentQuestion: index === currentIndex}, {attempted: answered.indexOf(index) >= 0} ]"
          @click="jumpToQuestion(index)"
        >
          {{ index + 1 }}
        </span>
      </div>
      <div class="show-question">
        <p class="question-track">
          <b>Question: {{ currentIndex + 1 }}</b>
        </p>
        <div class="questions">
          <p>
            {{ questions[currentIndex].question }}
          </p>
        </div>
        <div class="answers">
          <b-form-group class="left">
            <b-form-radio
              class="options"
              v-model="questions[currentIndex].selected"
              v-for="(ans, index) in options"
              :key="index"
              :value="ans"
              @change="addToAnswered()"
            >
              {{ ans }}
            </b-form-radio>
          </b-form-group>
        </div>
        <div class="question-navigator">
          <button
            :class="[{disabled: currentIndex === 0}, ]"
            :disabled="currentIndex === 0"
            @click="previous"
          >
            Previous
          </button>
          <button
            v-if="currentIndex === questions.length - 1"
            @click="markQuestion"
          >
            Submit
          </button>
           <button
            v-else
            @click="next()"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      score: 0,
      currentTime: '',
      currentIndex: 0,
      interval: null,
      quitInterval: false,
      shuffledAns: [],
      answered: [],
      userAnswers: []
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    ...mapGetters([
      'questions'
    ]),
    options () {
      const answers = this.shuffleAnswer()
      return answers
    },
    isAnswered (index) {
      if (this.answered.indexOf(index) >= 0) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    questions: {
      immediate: true,
      handler () {
        this.shuffleAnswer()
      }
    },
    quitInterval: {
      immediate: true,
      handler () {
        clearInterval(this.interval)
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleTestAvailable'
    ]),
    startTimer (duration) {
      let timer = duration
      let minutes
      let seconds
      this.interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? `0${minutes}` : minutes
        seconds = seconds < 10 ? `0${seconds}` : seconds
        this.$refs.timerContainer.innerHTML = `${minutes}:${seconds}`
        if (--timer < 0) {
          this.toggleTestAvailable()
          this.markQuestion()
          this.quitInterval = true
          this.$router.push('/dashboard')
        }
      }, 1000)
    },
    next () {
      this.currentIndex++
    },
    previous () {
      --this.currentIndex
    },
    jumpToQuestion (index) {
      this.currentIndex = index
    },
    markQuestion () {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].selected === this.questions[i].answer) {
          this.score++
        }
      }
      const tottalQuestion = this.questions.length
      // SEND TO THE SERVER
      const payload = {
        student: this.user.matricNum,
        course: 'csc_321',
        total: tottalQuestion,
        score: this.score
      }
      console.log(payload)
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
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    addToAnswered () {
      if (this.answered.indexOf(this.currentIndex) < 0) {
        this.answered.push(this.currentIndex)
      }
    },
    shuffleAnswer () {
      this.selected = ''
      const answers = [...this.questions[this.currentIndex].options]
      answers.push(this.questions[this.currentIndex].answer)
      const shuffledAns = _.shuffle(answers)
      return shuffledAns
    }
  },
  mounted () {
    setTimeout(() => {
      const minutes = 5
      this.startTimer(minutes)
    }, 1000)
  }
}
</script>
