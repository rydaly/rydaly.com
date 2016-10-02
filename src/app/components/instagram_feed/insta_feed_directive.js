'use strict';
/* global angular */

angular.module('rydaly')
  .directive('instaFeed', function() {
    return {
      scope: true,
      controller: 'InstaFeedController',
      controllerAs: 'instaCtrl',
      templateUrl: 'app/components/insta_feed/insta_feed.html'
    };
  });
