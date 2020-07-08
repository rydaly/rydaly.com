<template>
  <div class="projects-container">
    <div class="projects">
      <project
        v-for="item in this.$root.projectsData"
        v-bind:key="item._id"
        v-bind:project="item"
        ></project>
    </div>
  </div>
</template>

<script>
import project from "./Project.vue";

export default {
  name: "Projects",
  created() {
    console.log(this.$root.projectsData);
  },
  components: {
    project
  }
};
</script>
