'use strict';
/* global angular */

angular.module('rydaly')
  .directive('rdSocial', RdSocial);

  function RdSocial() {

    function rdSocial($scope, $element) {

      $scope.socialItems = [
        {'name': 'Resumé',
         'link': 'assets/pdf/RyanDaly_Resume.pdf',
         'icon': 'fa fa-file-text'
        },
        {'name': 'Instagram',
         'link': 'http://instagram.com/ry.daly',
         'icon': 'fa fa-instagram'
        },
        {'name': 'LinkedIn',
         'link': 'http://www.linkedin.com/in/ryandaly/en',
         'icon': 'fa fa-linkedin'
        },
        {'name': 'Github',
         'link': 'https://github.com/rydaly',
         'icon': 'fa fa-github'
        },
        {'name': 'Codepen',
         'link': 'https://codepen.io/rydaly/',
         'icon': 'fa fa-codepen'
        },
        {'name': 'Email',
         'link': 'mailto:rydaly@gmail.com?Subject=Howdy%20Ryan',
         'icon': 'fa fa-envelope'
        }
      ];
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'app/views/partials/elements/rdSocial.html',
      link: rdSocial
    };
  }
