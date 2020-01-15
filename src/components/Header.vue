<template>
  <header class="header bg-gray">
    <div class="header-title hidden-mobile">
    </div>
    <div class="header-logo">
      <router-link to="/">
        <svg id="af-logo" data-name="af-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.94 151.24">
          <path class="" d="M144 151.24l8.94-4.48L120.56 82h32.37V72H48.56l31-62h73.37V0H73.38L0 146.76l8.94 4.48L43.56 82h65.82L144 151.24z"/>
        </svg>
      </router-link>
    </div>
    <div class="header-nav">

      <ul class="nav-list nav-list--dt hidden-mobile">
        <li class="nav-item"><router-link to="/about">About</router-link></li>
        <li class="nav-item"><router-link to="/resume">Resume</router-link></li>
        <li class="nav-item"><router-link to="/contact" class="btn btn--small">Contact</router-link></li>
      </ul>

      <div v-on:click="toggleMobileMenu"
        v-bind:class="{active: mobileMenuActive}"
        class="mobile-nav-toggle hidden-dt">
        <a ref="mobileMenuText" href="javascript:void(0)">MENU</a>
      </div>

    </div>

    <ul v-bind:class="{active: mobileMenuActive}"
      class="nav-list nav-list--mobile hidden-dt">
      <li v-on:click="toggleMobileMenu" class="nav-item">
        <router-link to="/about">About</router-link>
      </li>
      <li v-on:click="toggleMobileMenu" class="nav-item">
        <router-link to="/resume">Resume</router-link>
      </li>
      <li v-on:click="toggleMobileMenu" class="nav-item">
        <router-link to="/contact">Contact</router-link>
      </li>
    </ul>

  </header>

</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      mobileMenuActive: false
    }
  },
  methods: {
    toggleMobileMenu() {
      // console.log(this.$refs.mobileMenuText);
      let menuText = this.$refs.mobileMenuText.firstChild;
      this.mobileMenuActive = !this.mobileMenuActive;
      this.mobileMenuActive ? menuText.nodeValue = 'CLOSE' : menuText.nodeValue = 'MENU';
    }
  }
};
</script>
