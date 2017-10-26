'use strict';
/* global angular */

angular.module('rydaly')
  .directive('resumeView', function() {
    return {
      scope: true,
      templateUrl: 'app/components/resume/resume_view.html'
    };
  });
