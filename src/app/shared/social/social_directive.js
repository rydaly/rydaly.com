'use strict';

angular.module('rydaly')
  .directive('rdSocial', RdSocial);

  function RdSocial() {

    function rdSocialLink($scope) {

      $scope.socialItems = [
        {'name': 'Instagram',
         'link': 'http://instagram.com/ry.daly',
         'icon': 'fa fa-instagram'
        },
        {'name': 'LinkedIn',
         'link': 'http://www.linkedin.com/in/ryandaly/en',
         'icon': 'fa fa-linkedin'
        },
        {'name': 'Email',
         'link': 'mailto:ryan@rydaly.com?Subject=Howdy%20Ryan',
         'icon': 'fa fa-envelope'
        }
      ];
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'app/shared/social/social.html',
      link: rdSocialLink
    };
  }
