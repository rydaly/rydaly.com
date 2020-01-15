<template>
<div id="work">
  <div class="content">
    <div class="content__inner">
      <h4 class="text-uppercase text-center">Strategy & Execution</h4>
      <h1>Visual Communications</h1>
      <p>Below are a few of the amazing brands I've been lucky enough to colloborate with over the course of my career.</p>ß
      <projects></projects>
    </div>
  </div>
</div>
</template>

<script>
import Projects from '../components/Projects.vue';

export default {
  name: 'Work',
  components: {
    'projects': Projects
  }
};
</script>
