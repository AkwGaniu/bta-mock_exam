<template>
  <div class="test-view-container">
    <div class="upper-section">
      <div class="student-details">
        <p class="name">Sodipo Uthman Oluwaseto</p>
        <p class="matric">170591939</p>
      </div>
      <div class="timer">
        <p>30:00</p>
      </div>
    </div>
    <div class="lower-section">
      <div class="question-list">
        <span
          v-for="question in questions"
          :key="question"
        >
          {{ question }}
        </span>
      </div>
      <div class="showQuestion">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      questions: [1, 2, 3, 4, 5, 6, 7, 7, 8, 6, 66, 5, 6]
    }
  }
}
</script>
