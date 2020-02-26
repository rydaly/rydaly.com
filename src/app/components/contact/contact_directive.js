'use strict';

angular.module('rydaly')
  .directive('contactView', function() {
    return {
      scope: true,
      templateUrl: 'app/components/contact/contact_view.html'
    };
  });
