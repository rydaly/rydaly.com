'use strict';
/* global angular, FastClick, ga, window, document, setTimeout */

(function() {
  angular.module('rydaly', [
                 'ngTouch',
                 'ngRoute',
                 'ngAnimate',
                 'ngCookies',
                 'ngSanitize',
                 'ngAria',
                 'ngResource',
                 'rdExpander'])

  .config( function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/views/hi/index.html',
        preload: true
      })
      .when('/contact', {
        templateUrl: 'app/components/views/contact/index.html',
        preload: true
      })
      .when('/lab', {
        templateUrl: 'app/components/views/lab/index.html',
        preload: true
      })
      .when('/toolkit', {
        templateUrl: 'app/components/views/toolkit/index.html',
        preload: true
      })
      .when('/work', {
        templateUrl: 'app/components/views/work/index.html',
        preload: true
      })
      .when('/overlay', {
        state: 'overlay'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function($window, $rootScope, $route, $templateCache, $http, $location) {
    var initialLoad = true;

    // console.log(navItems);

    FastClick.attach(document.body);
    $rootScope.isAutomaticScroll = false;

    // redirect to root if loaded on overlay
    if(initialLoad) {
      if($location.url() === '/overlay') {
        $location.path( "/" );
      }
      initialLoad = false;
    }

    $rootScope.$on('$routeChangeStart', function() {
      // close the overlay if it's open
      if($rootScope.activeTab === '/overlay') {
        $rootScope.$emit( "modals.close" );
      }
    });

    // set active tab and track
    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.activeTab = $location.url();
      // send pageview to analytics
      $window.ga('send', 'pageview', { page: $location.url() });
    });

    // cache templates
    var url;
    for(var i in $route.routes) {
      if($route.routes[i].preload) {
        if(url == $route.routes[i].templateUrl) {
          $http.get(url, { cache: $templateCache });
        }
      }
    }

    // Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-25348228-1', 'auto');
    ga('send', 'pageview');

  });

  (function bootstrapApp() {
    angular.element(document).ready(function() {

      angular.bootstrap(document, ['rydaly']);

      var cover;

      setTimeout(function() {
        cover = angular.element(document.getElementById('cover'));
        cover.addClass('hide-cover');
      }, 250);

      setTimeout(function() {
        cover.remove();
      }, 1250);

    });
  })();

}());
