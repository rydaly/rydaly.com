<template>
  <div id="about">
    <div class="content">
      <div class="content__inner">
        <h2 class="text-title">{{ getOption('ap_header') }}</h2>
        <a target="_blank" :href="getOption('ap_linkedin_link')" class="icon-link right">
          <span class="icon icon--linkedin"></span>
        </a>
        <div class="portrait" v-lazy:background-image="getOption('ap_image')"></div>
        <div class="bio">
          <p v-html="getHtmlOption('ap_bio')"></p>
          <router-link to="/project/5" class="btn btn--small">
            <span>View Work</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GetOption from "../mixins/GetOption";

export default {
  name: "About",
  mixins: [GetOption]
};
</script>
