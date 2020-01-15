<template>
  <div id="resume">
    <div class="content">
      <div class="content__inner">
        <h2 class="text-title">{{ getOption('rp_header') }}</h2>

        <a
          target="_blank"
          :href="getOption('rp_pdf')"
          class="btn btn--right btn--small"
        >Download Resume</a>

        <div class="resume-content">
          <div>
            <h3 class="text-uppercase">Work Experience</h3>
            <div
              v-for="(item, index) in getOption('rp_work_experience')"
              v-bind:key="index"
              class="row"
            >
              <label>{{ item.job_title }}</label>
              <p class="details">
                <span class="font-weight-medium">{{ item.company }}</span>
                <span class="font-weight-medium">{{ item.location }}</span>
                <span>{{ item.year }}</span>
              </p>
              <p class="list-head">Brands:</p>
              <p v-html="widont(item.brands)"></p>
              <p class="list-head">Responsibilities:</p>
              <p v-html="widont(item.responsibilities)"></p>
            </div>
          </div>

          <div>
            <h3 class="text-uppercase">Miscellaneous Projects</h3>
            <div
              v-for="(item, index) in getOption('rp_miscellaneous_projects')"
              v-bind:key="index"
              class="row"
            >
              <p v-html="widont(item.project)"></p>
            </div>
          </div>

          <div>
            <h3 class="text-uppercase">Education</h3>
            <div
              v-for="(item, index) in getOption('rp_education_items')"
              v-bind:key="index"
              class="row"
            >
              <p class="impact">{{ item.degree }}</p>
              <p>{{ item.school }}</p>
              <p>{{ item.dates }}</p>
              <p v-if="item.concentration">Concentration: {{ item.concentration }}</p>
              <p v-if="item.major">Major: {{ item.major }}</p>
              <p v-if="item.minor">Minor: {{ item.minor }}</p>
            </div>
          </div>

          <div>
            <h3 class="text-uppercase">Skills</h3>
            <div class="row">
              <p class="list-head">Abilities:</p>
              <p v-html="widont(getOption('rp_skills').abilities)"></p>
              <p class="list-head">Applications:</p>
              <p v-html="widont(getOption('rp_skills').applications)"></p>
            </div>
          </div>

          <div>
            <h3 class="text-uppercase">Interests</h3>
            <div class="row">
              <p v-html="widont(getOption('rp_interests'))"></p>
            </div>
          </div>

          <!-- <div>
            <h3 class="text-uppercase">Contact</h3>
            <div class="row">
              <p><span class="list-head">Mobile:</span> <a :href="`tel:${getOption('rp_contact').mobile}`">{{ getOption('rp_contact').mobile }}</a></p>
              <p><span class="list-head">Email:</span> <a :href="`mailto:${getOption('rp_contact').email}`">{{ getOption('rp_contact').email }}</a></p>
              <p><span class="list-head">Web:</span> <a :href="`${getOption('rp_contact').web}`">{{ getOption('rp_contact').web }}</a></p>
              <p><span class="list-head">Linkedin:</span> <a :href="`${getOption('rp_contact').linkedin}`">{{ getOption('rp_contact').linkedin }}</a></p>
            </div>
          </div> -->
        </div>

        <router-link to="/contact" class="btn">
          <span>Contact Adam</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import GetOption from "../mixins/GetOption";
import Widont from "../mixins/Widont";

export default {
  name: "Resume",
  mixins: [GetOption, Widont]
};
</script>
