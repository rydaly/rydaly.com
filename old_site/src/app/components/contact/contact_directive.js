'use strict';
/* global angular */

angular.module('rydaly')
  .directive('contactView', function() {
    return {
      scope: true,
      templateUrl: 'app/components/contact/contact_view.html'
    };
  });
