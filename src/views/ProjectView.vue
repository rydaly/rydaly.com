<template>
  <div id="project-view">
    <div class="content">
      <div class="content__inner">
          <project-view-item
          v-for="item in currentItem($route.params.id)"
          v-bind:key="item.ID"
          v-bind:item="item"></project-view-item>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectViewItem from "../components/ProjectViewItem.vue";

export default {
  name: "ProjectView",
  methods: {
    currentItem: function(id) {
      return this.$root.projectsData.filter(obj => {
        return obj.ID == id ? obj : false;
      });
    }
  },
  components: {
    "project-view-item": ProjectViewItem
  }
};
</script>
