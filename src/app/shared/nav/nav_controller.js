"use strict";

angular.module("rydaly").controller("NavController", NavController);

function NavController($rootScope) {
  var navCtrl = this;
  navCtrl.items = [
    {
      path: "/",
      title: "Hi",
      imgPath: "assets/images/rd-small.png"
    },
    {
      path: "/work",
      title: "Work"
    },
    // {
    //   path: "/lab",
    //   title: "Lab",
    // },
    {
      path: "/resume",
      title: "Experience"
    },
    {
      path: "/contact",
      title: "Contact"
    }
  ];

  navCtrl.isActive = function (item) {
    return item.path === $rootScope.activeTab ? true : false;
  };
}
