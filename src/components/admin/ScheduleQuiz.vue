<template>
  <div class="schedule-quiz-view-container">
    <div
      class="schedule"
    >
    <div class="list-of-course">
      <div class="form-group">
        <select name="courses" ref="courses">
          <option value="">--Select Course--</option>
          <option
            v-for="(course, index) in [1,2,3,4,5]"
            :key="index"
            value="course"
          > CSC 101 </option>
        </select>
      </div>
      <div class="course-detials-container">
        <div class="no-course-selected">
          Select a course to update its schedule
        </div>
        <div class="course-details">
          <div class="form-group">
            <label for="course title">Course Title</label>
            <input type="text" value="Introduction to computer" disabled="true">
          </div>
          <div class="form-group">
            <label for="course code">Course <Code></Code></label>
            <input type="text" value="CSC 101" disabled="true">
          </div>
          <div class="form-group">
            <label for="date">Exam Date</label>
            <input type="date" value="">
          </div>
          <div class="form-group">
            <label for="duration">Exam Duration</label>
            <input type="number" value="">
          </div>
          <div class="form-group">
            <label for="release result">Release Result</label>
            <input type="checkbox" value="true"> I have a bike<br>
          </div>
          <div class="btn-holder">
            <input type="submit" value="Update Schedule">
          </div>
        </div>
      </div>
      <table>
        <thead>
          <th  class="left">Course Title</th>
          <th>Exam Date</th>
          <th>Exam Duration</th>
          <th>Release Result</th>
          <th class="right">Action</th>
        </thead>
        <tbody>
          <tr>
            <td> course.course_title </td>
            <td> course.course_code </td>
            <td> course.Date </td>
            <td> course.Date </td>
            <td >
              <button>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p></p>
    </div>
    </div>
  </div>
</template>
