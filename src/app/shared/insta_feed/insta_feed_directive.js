'use strict';

angular.module('rydaly')
  .directive('instaFeed', function() {
    return {
      scope: true,
      controller: 'InstaFeedController',
      controllerAs: 'instaCtrl',
      templateUrl: 'app/shared/insta_feed/insta_feed.html'
    };
  });
