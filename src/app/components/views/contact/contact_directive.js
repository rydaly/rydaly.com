'use strict';
/* global angular */

angular.module('rydaly')
  .directive('contactView', function() {
    return {
      scope: true,
      templateUrl: 'app/components/views/contact/contact_view.html'
    };
  });
