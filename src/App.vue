<template>
  <div id="app" v-cloak>
    <Header></Header>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
};
</script>
