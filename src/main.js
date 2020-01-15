import Vue from 'vue';
import App from './App.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Resume from './views/Resume.vue';
import Work from './views/Work.vue';
import Contact from './views/Contact.vue';
import NotFound from './views/NotFound.vue';
import ProjectView from './views/ProjectView.vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
import InView from 'in-view';
import VueScrollmagic from 'vue-scrollmagic';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueScrollmagic);
Vue.use(VueLazyload, {
  // loading: './assets/common/loading.gif'
});

import './styles/index.scss';

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/resume',
      component: Resume
    },
    {
      path: '/work',
      component: Work
    },
    {
      path: '/project/:id',
      component: ProjectView
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  let content = document.getElementById('project-view');

  if (content != null) {
    content.classList.add('hide');
    content.classList.remove('show');
  }
  window.setTimeout(() => {
    next();
    window.scrollTo(0, 0); // scroll to top
    if (content != null) {
      content.classList.remove('hide');
      content.classList.add('show');
    }
    initInView();
  }, 350);
});

let promises = [];
const projectsData = [];
const optionsData = {};
const projectsEndpoint =
  'https://adamfleishman.com/wp/wp-json/projects/v1/post';
const optionsEndpoint =
  'https://adamfleishman.com/wp/wp-json/acf/v3/options/options';

promises.push(fetch(projectsEndpoint).then(response => response.json()));
promises.push(fetch(optionsEndpoint).then(response => response.json()));

let initInView = () => {
  // console.log('INIT IN VIEW');
  InView('video, img')
    .on('enter', el => {
      // console.log(el.nodeName + ' in view');
      if(el.nodeName === 'VIDEO') el.play();
      // el.classList.add('show');
      // el.classList.remove('hide');
    })
    .on('exit', el => {
      // console.log(el + ' out of view');
      if(el.nodeName === 'VIDEO') el.pause();
      // el.classList.remove('show');
      // el.classList.add('hide');
    });
};

let hideLoader = () => {
  let loadingEl = document.getElementsByTagName('body')[0];
  loadingEl.classList.add('loaded');
};

let app = new Vue({
  render: h => h(App),
  router,
  data: {
    loaded: false,
    projectsData,
    optionsData
  },
  created: function() {
    let vm = this;

    Promise.all(promises)
      .then(response => {
        let projectData = response[0];
        let optionData = response[1];
        // console.log('projects :: ', response[0]);
        for (let i = 0, len = projectData.length; i < len; i++) {
          projectsData.push(projectData[i]);
        }

        optionsData['acf'] = optionData.acf;

        vm.$nextTick(() => {
          vm.loaded = true;
          app.$mount('#app');
        });
      })
      .catch(e => {
        console.log('Error getting data from WP REST api ::', e);
      });
  },
  mounted: function() {
    initInView();
    hideLoader();
  }
});
