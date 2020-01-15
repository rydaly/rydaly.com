<template>
  <div id="home">
    <div class="content content--hero bg-gray">
      <div class="content__inner">
        <h3 class="text-uppercase text-center">
          {{ getOption('hp_hero_label') }}
        </h3>
        <h1 class="text-title text-center">{{ getOption('hp_hero_name') }}</h1>
        <p class="lead text-center" v-html="widont(getOption('hp_hero_description'))"></p>
      </div>
    </div>

    <div class="content content--header">
      <h5 class="text-uppercase text-center">
        {{ getOption('hp_sub_label') }}
      </h5>
      <h2 class="text-title text-center">{{ getOption('hp_sub_title') }}</h2>
      <p class="text-center" v-html="widont(getOption('hp_sub_description'))"></p>
    </div>

    <projects></projects>

    <logos></logos>

    <div class="content pad-section-default">
      <h2>{{ getOption('contact_section_header') }}</h2>
      <p class="text-center">{{ getOption('contact_section_text') }}</p>
      <router-link to="/contact" class="btn btn--small btn--dark">
        <span>{{ getOption('contact_section_button_text') }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import GetOption from '../mixins/GetOption';
import LogoGrid from '../components/LogoGrid.vue';
import Projects from '../components/Projects.vue';
import { TweenLite } from 'gsap';
import Widont from "../mixins/Widont";

export default {
  name: 'Home',
  components: {
    projects: Projects,
    logos: LogoGrid
  },
  mixins: [GetOption, Widont],
  mounted() {
    var halfs = document.querySelectorAll('.half');
    var pairCounter = 1;

    let videoEls = document.getElementsByTagName('video');
    // console.log('mounted - ', videoEls);

    for(var j = 0; j < videoEls.length; j++) {
      videoEls[j].addEventListener('loadstart', (e) => {
        // console.log('load start');
        e.target.parentNode.classList.add('show-loader');
      });
      videoEls[j].addEventListener('canplay', (e) => {
        // console.log('can play');
        e.target.parentNode.classList.remove('show-loader');
      });
    }

    if(window.innerWidth < 768) return;

    for (var i = 0; i < halfs.length; i++) {
      let travel;

      if(i%2 === 0) {
        if(pairCounter%2 === 0) {
          // travel = '-20px';
          travel = window.innerWidth < 768 ? '0px' : '-20px';
        } else {
          // travel = '20px';
          travel = window.innerWidth < 768 ? '0px' : '20px';
        }
        pairCounter++;
      } else {
        if(pairCounter%2 === 0) {
          // travel = '-20px';
          travel = window.innerWidth < 768 ? '0px' : '-20px';
        } else {
          // travel = '20px';
          travel = window.innerWidth < 768 ? '0px' : '20px';
        }
      }

      const temp = this.$scrollmagic
        .scene({
          triggerElement: halfs[i],
          offset: -200,
          duration: '200%'
        })
        .setTween(TweenLite.from(halfs[i], 1, {
          css: { transform: 'translateX(' + travel + ')' },
          // ease: Power1.easeInOut
        }))

      this.$scrollmagic.addScene(temp);
    }
  }
};
</script>
