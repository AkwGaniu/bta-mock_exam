<template>
  <div class="test-instruction-view-container">
    <h1>Basic Tutor Academy Mock Examination</h1>
      <div class="sections student-profile">
        <div class="user-top">
            <p class="name">
            <b>Course Title: </b>
            <span>Computational analysis</span>
          </p>
          <p class="matric">
            <b>Course Code: </b>
            <span>CSC 419</span>
          </p>
        </div>
        <div class="user-bottom">
          <p class="dept">
            <b>Course Unit: </b>
            <span> 3 </span>
          </p>
          <p class="level">
            <b>Exam Duration: </b>

            <span> 30 Minutes </span>
          </p>
        </div>
      </div>
    <div class="main-content">
      <p class="instruction">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper sagittis nibh in laoreet. Pellentesque porta turpis non metus vestibulum, tempus commodo ipsum dignissim. Donec convallis eleifend sapien, non facilisis metus. Praesent et cursus lorem. Quisque at dui sit amet nulla facilisis aliquet. Etiam euismod imperdiet augue, ut rhoncus sem pellentesque eget. Suspendisse est ipsum, faucibus eget dolor eget, ultricies lacinia ligula. Sed lacinia tristique dui, semper faucibus mauris varius non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc vitae massa imperdiet, condimentum quam ac, imperdiet mi. Proin vitae tellus dictum, maximus est sed, accumsan est. Sed ultrices diam ut nisl euismod, non fringilla lectus placerat. Morbi placerat sapien vel semper tempus. Etiam ut ipsum quis purus rhoncus tincidunt sed eu nisl. Nam faucibus, est volutpat dictum dictum, nulla ligula eleifend risus, ac consectetur justo eros et orci.
        Proin quis sapien elit. Quisque ac justo est. Morbi varius tristique tellus non viverra. Proin tincidunt leo aliquet nisl volutpat vestibulum. Praesent posuere erat ut sagittis tincidunt. Vestibulum eget metus a orci consectetur vestibulum et ut est. Aliquam vestibulum risus id consequat posuere. Morbi malesuada turpis ac nulla convallis, a elementum nulla fermentum. Integer ac tellus ante.
      </p>
      <div class="start-quiz">
        <router-link
          class="start-quiz-btn"
          :to="`/test/${testCode}`"
        >
          Start Quiz
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      testCode: 'csc_434'
    }
  }
}
</script>
