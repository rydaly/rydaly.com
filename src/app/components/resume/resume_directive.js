'use strict';

angular.module('rydaly')
  .directive('resumeView', function() {
    return {
      scope: true,
      templateUrl: 'app/components/resume/resume_view.html'
    };
  });
