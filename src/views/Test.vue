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
        <p><b>Time left: </b> 30:00</p>
      </div>
    </div>
    <div class="lower-section">
      <div class="question-tracker">
        <span
          v-for="question in questions"
          :key="question"
        >
          {{ question }}
        </span>
      </div>
      <div class="show-question">
        <p class="question-track">
          <b>Question: {{ currentQuestion }}</b>
        </p>
        <div class="questions">
          <p>
            Phasellus nec interdum dui, sed suscipit ligula. Nam at dui dui. Proin quis massa lacinia, venenatis eros in, laoreet nulla. Etiam laoreet, justo nec facilisis malesuada, magna velit ultrices eros, nec rhoncus sapien augue et sem. Nunc viverra tincidunt auctor. Quisque vel leo ornare, tincidunt turpis ac, faucibus tellus. Etiam et nibh vulputate, molestie diam sed, ultricies nunc. Cras in suscipit sem.
          </p>
        </div>
        <div class="answers">
          <b-form-group class="left">
            <b-form-radio-group
              id="radio-group-1"
              v-model="selected"
              :options="options1"
              name="radio-options2"
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group  class="right">
            <b-form-radio-group
              id="radio-group-2"
              v-model="selected"
              :options="options2"
              name="radio-options2"
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <div class="question-navigator">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentQuestion: 1,
      questions: [1, 2, 3, 4, 5, 6, 7, 7, 8, 6, 66, 5, 6],
      selected: '',
      options1: [
        { text: 'Computational Science (CSC 345)', value: 'Add' },
        { text: 'Computational Science (CSC 345)', value: 'Blhljlw' }
      ],
      options2: [
        { text: 'Computational Science ', value: 'frggglr' },
        { text: 'Computational Science ', value: 'Bhkggkgkjhjh' }
      ]
    }
  }
}
</script>
