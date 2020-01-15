<template>
  <nav class="project-nav">
    <div class="container">
      <div class="prev">
        <a v-on:click="prev($event)">
          <img src="../assets/common/angle-left.svg" alt="Previous Project" />
          <span>Previous Project</span>
        </a>
      </div>
      <div class="next">
        <a v-on:click="next($event)">
          <span>Next Project</span>
          <img src="../assets/common/angle-right.svg" alt="Next Project" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ProjectNav',
  methods: {
    next: function(e) {
      this.$parent.next(e);
    },
    prev: function(e) {
      this.$parent.prev(e);
    }
  }
};
</script>
