'use strict';
/* global angular */

angular.module('rydaly')
  .directive('contactForm', function() {
    return {
      scope: true,
      controller: 'ContactFormController',
      controllerAs: 'contactCtrl',
      templateUrl: 'app/components/contact/contact_form/contact_form.html'
    };
  });
