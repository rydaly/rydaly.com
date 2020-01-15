<template>
  <div class="project-items-container" v-bind:class="[`page-${item.post_title.replace(' ', '-').toLowerCase()}`]">
    <div class="project-header" :style="{ backgroundImage: `url(${item.acf.header_image.sizes.large})` }">
      <div class="logo-container">
        <img class="brand-logo" :src="item.acf.brand_logo" :alt="item.post_title" />
      </div>
    </div>

    <ProjectNav></ProjectNav>

    <div class="project-details">
      <h4 class="text-uppercase">{{ item.acf.category }}</h4>
      <p v-html="widont(item.acf.long_description)"></p>
    </div>
    <div class="project-items">
      <div v-for="(group, index) in item.acf.detail_groups" v-bind:key="index" class="project-group">
        <h2 class="group-header text-center">{{ group.group_title }}</h2>
        <div v-for="(section, index) in group.group_items" v-bind:key="index" class="project-section" v-bind:class="[`columns-${section.number_of_columns}`]">
          <h3 class="section-header text-center" v-html="widont(section.section_title)"></h3>
          <div v-for="(item, index) in section.section_items" v-bind:key="index" class="project-item">
            <img v-if="!item.gif && !item.mp4" v-lazy="item.image" />
            <img v-if="item.gif && !item.mp4" v-lazy="item.gif" />
            <video v-if="item.mp4" autoplay loop muted playsinline>
              <source :src="item.mp4" type="video/mp4">
              <source v-if="item.webm" :src="item.webm" type="video/webm" />
            </video>
            <div class="border-overlay"></div>
          </div>
        </div>
      </div>
    </div>

    <ProjectNav></ProjectNav>

  </div>
</template>

<script>
import ProjectNav from './ProjectNav.vue';
import Widont from "../mixins/Widont";

export default {
  name: 'ProjectViewItem',
  mixins: [Widont],
  components: {
    ProjectNav
  },
  props: ['item'],
  data: () => {
    return {
      itemsArray: [],
      currentIndex: 0,
      currentProjectId: 0
    };
  },
  created() {
    for (let i = 0; i < this.$root.projectsData.length; i++) {
      const el = this.$root.projectsData[i];
      this.itemsArray[i] = el.ID;
    }

    this.currentProjectId = this.item.ID;
    this.currentIndex = this.itemsArray.indexOf(this.currentProjectId);
  },
  methods: {
    next: function(e) {
      e.preventDefault();
      this.currentIndex++;
      if (this.currentIndex > this.$root.projectsData.length - 1)
        this.currentIndex = 0;

      let newRoute =
        "/project/" + this.itemsArray[this.currentIndex].toString();
      this.$router.push(newRoute);
    },
    prev: function(e) {
      e.preventDefault();
      this.currentIndex--;
      if (this.currentIndex < 0)
        this.currentIndex = this.$root.projectsData.length - 1;

      let newRoute =
        "/project/" + this.itemsArray[this.currentIndex].toString();
      this.$router.push(newRoute);
    },
    // getVideoDimensions: function(el) {

    // }
  }
};
</script>
