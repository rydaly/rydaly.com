'use strict';
/* global angular */

angular.module('rydaly')
  .controller('NavController', NavController);

function NavController($rootScope) {
  var navCtrl = this;
  navCtrl.items = [{
    path: '/work',
    title: 'Work'
  }, {
    path: '/lab',
    title: 'Lab'
  }, {
    path: '/',
    title: 'Hi',
    imgPath: 'assets/images/rd-small.png'
  }, {
    path: '/toolkit',
    title: 'Toolkit'
  }, {
    path: '/contact',
    title: 'Contact'
  }];

  navCtrl.isActive = function(item) {
    return item.path === $rootScope.activeTab ? true : false;
  };
}
