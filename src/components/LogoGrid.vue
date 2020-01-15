<template>
  <div class="logo-grid-container content">
    <h4 class="font-weight-normal">{{ getOption('logo_grid_header') }}</h4>
    <div class="logo-grid">
      <div v-for="item in getOption('logo_grid_items')" v-bind:key="item.item_logo.ID">
        <!-- <img :src="item.item_logo.url" :alt="item.item_logo.title" /> -->
        <InlineSvg :src="item.item_logo.url"/>
      </div>
    </div>
  </div>
</template>

<script>
import GetOption from '../mixins/GetOption';
import InlineSvg from './InlineSvg';

export default {
  name: 'LogoGrid',
  created() {
    // console.log(this.$root.projectsData);
  },
  mixins: [GetOption],
  components: {
    InlineSvg
  }
};
</script>
