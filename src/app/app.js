'use strict';
/* global angular, FastClick */

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

  .config( function($routeProvider, $logProvider) {
    $logProvider.debugEnabled(true);
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/hi.html',
        activeTab: 'hi',
        preload: true
      })   
      .when('/toolkit', {
        templateUrl: 'app/views/skills.html',
        activeTab: 'toolkit',
        preload: true
      })   
      .when('/work', {
        templateUrl: 'app/views/work.html',
        activeTab: 'work',
        preload: true
      })  
      .when('/lab', {
        templateUrl: 'app/views/lab.html',
        activeTab: 'lab',
        preload: true
      })  
      .when('/contact', {
        templateUrl: 'app/views/contact.html',
        activeTab: 'contact',
        preload: true
      })
      .when('/overlay', {
        activeTab: 'work',
        state: 'overlay'
      })
      .otherwise({
        redirectTo: '/'
      });  
  })

  .run(function($window, $rootScope, $route, $templateCache, $http, $location) {
    var initialLoad = true;

    FastClick.attach(document.body);
    $rootScope.isAutomaticScroll = false;

    // redirect to root if loaded on overlay
    if(initialLoad) {
      if($location.url() === '/overlay') {
        $location.path( "/" );
      }
      initialLoad = false;
    }

    // set active tab and track
    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.activeTab = $location.url().replace(/^\//, '');

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
