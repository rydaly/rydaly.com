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

  .run(function($rootScope, $route, $templateCache, $http) {
    FastClick.attach(document.body);
    $rootScope.isAutomaticScroll = false;

    $rootScope.$on('$routeChangeStart', function() {
      // console.log($route.current.$$route.state);
      if($route.current && $route.current.$$route.state === "overlay") {
        $rootScope.$emit( 'modals.close' );
      }
    });

    // update page class on ng-view for animation
    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.activeTab = $route.current.$$route.activeTab;
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

  });

  (function bootstrapApp() {
    angular.element(document).ready(function() {

      angular.bootstrap(document, ['rydaly']);
      
      var cover;

      setTimeout(function() {
        cover = angular.element(document.getElementById('cover'));
        cover.addClass('hide-cover');
      }, 500);

      setTimeout(function() {
        // cover.remove();
      }, 3000);

    });
  })();

}());
