'use strict';

angular.module('rydaly')
  .controller('NavController', NavController);

function NavController($location) {
  var vm = this;
      vm.items = [
        { path: '/work', title: 'Work' },
        { path: '/lab', title: 'Lab' },
        { path: '/', title: 'Hi', imgPath: 'assets/images/rd-small.png' },
        { path: '/toolkit', title: 'Toolkit' },
        { path: '/contact', title: 'Contact' }
      ];
      vm.isActive = function(item) {
        // console.log(item.path + " :: item.path");
        // console.log($location.path() + " :: location.path");
        return item.path == $location.path() ? true : false;
        // TODO :: make sure this is being re-set on route change...
        //      :: not working with browser back button right now.
      };
}