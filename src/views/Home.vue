<template>
  <div id="home">
    <div class="content content--hero bg-gray">
      <div class="content__inner">
        <h3 class="text-uppercase text-center">
          {{ getOption('title') }}
        </h3>
        <h1 class="text-title text-center">{{ getOption('title') }}</h1>
        <p class="lead text-center" v-html="widont(getOption('description'))"></p>
      </div>
    </div>

    <projects></projects>
  </div>
</template>

<script>
import GetOption from '../mixins/GetOption';
import Projects from '../components/Projects.vue';
import { TweenLite } from 'gsap';
import Widont from "../mixins/Widont";

export default {
  name: 'Home',
  components: {
    projects: Projects,
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
