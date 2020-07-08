<template>
  <div v-bind:class="[`project project--${project.title.replace(/\W+/g, '').toLowerCase()}`]">
    <router-link :to="{ path: 'project/' + project._id }" class="project-link">
      <div class="half">
        <h5 class="text-uppercase">{{ project.title }}</h5>
        <h2 class="text-title">{{ project.title }}</h2>
        <p v-html="widont(project.description)"></p>
        <div v-for="(img, i) in project.images" v-bind:key="i">
          <img :src="'https://rydaly.com/' + img.path" :alt="img.meta.title">
        </div>
        <!-- <router-link
          :to="{ path: 'project/' + project.ID }"
          class="btn"
        >{{ project.acf.button_text }}</router-link> -->
      </div>
      <!-- <div class="half project-preview">
        <img v-if="project.acf.preview_image" v-lazy="project.acf.preview_image" />
        <div class="overlay">
          <img
            v-if="!project.acf.overlay_gif && !project.acf.overlay_mp4"
            v-lazy="project.acf.overlay_poster_image"
            :class="getImgOrientation(project.acf.overlay_poster_image)"
          />
          <img
            v-if="project.acf.overlay_gif && !project.acf.overlay_mp4"
            v-lazy="project.acf.overlay_gif"
            :class="getImgOrientation(project.acf.overlay_gif)"
          />
          <video
            v-if="project.acf.overlay_mp4"
            :class="getImgOrientation(project.acf.overlay_poster_image)"
            :poster="[project.acf.overlay_poster_image ? project.acf.overlay_poster_image : '']"
            autoplay
            loop
            playsinline
            muted
          >
            <source :src="project.acf.overlay_mp4" type="video/mp4" />
            <source
              v-if="project.acf.overlay_webm"
              :src="project.acf.overlay_webm"
              type="video/webm"
            />
          </video>
        </div>
      </div> -->
    </router-link>
  </div>
</template>

<script>
import Widont from "../mixins/Widont";

export default {
  name: 'Project',
  props: ['project'],
  mixins: [Widont],
  methods: {
    getImgOrientation(imgUrl) {
      let img = new Image();
      let imgWidth = 0;
      let imgHeight = 0;

      img.onload = () => {
        imgWidth = img.width;
        imgHeight = img.height;

        return {
          'landscape': imgWidth > imgHeight,
          'portrait': imgWidth < imgHeight,
          'square': imgWidth === imgHeight
        }
      };

      img.src = imgUrl;
    }
  }
};
</script>
