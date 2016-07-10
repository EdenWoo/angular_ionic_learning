// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCookies'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//-------------------------Use angular $q--------------------------------------
.controller("AppCtrl",function($scope,$log){
  /*
  event-----contain the rou-contain the route change information its selfte change information its self
  next------contain information of the next route you navigate to
  current---contain information of current route
  */
      $scope.$on('$locationChangeStart', function (event, next, current) {
        $log.debug("$locationChangeStart fires");
        $log.debug(event);
        $log.debug(next);
        $log.debug(current);
      });

      $scope.$on('$routeChangeStart', function (event, next, current) {
        $log.debug("$locationChangeStart fires");
        $log.debug(event);
        $log.debug(next);
        $log.debug(current);
      });
})

