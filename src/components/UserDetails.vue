<template>
  <div class="sections student-profile">
    <div class="user-top">
      <p class="name">
        <b-icon
        class="icon"
        icon="person"
        font-scale="1.2"
      ></b-icon>
      <span> {{ userData.full_name }} </span>
    </p>
    <p class="matric">
      <b-icon
        class="icon"
        icon="layers"
        font-scale="1.2"
      ></b-icon>
      <span> {{ userData.matric_number }} </span>
    </p>
    </div>
    <div class="user-bottom">
    <p class="dept">
      <b-icon
        class="icon"
        icon="bookmarks"
        font-scale="1.2"
      ></b-icon>
      <span> {{ userData.department }} </span>
    </p>
    <p class="level">
        <b-icon
        class="icon"
        icon="sort-up"
        font-scale="1.2"
      ></b-icon>
      <span>100 Level</span>
    </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: Object
  }
}
</script>
