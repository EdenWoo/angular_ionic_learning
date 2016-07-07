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
.controller("AppCtrl",function($scope,$cookies){
    $scope.keys=[];

    //get all the cookies
    var cookies = $cookies.getAll();
console.log(cookies);
    //iterate all the cookies
    angular.forEach(cookies, function (v, k) {
      $scope.keys.push(k);
      console.log(v);
      
    });
    
    $scope.addItem=function(itemKey,itemValue){
      $scope.keys.push(itemKey);
      //put key and value into the cookies
      $cookies.put(itemKey,itemValue);
    };

    $scope.getItem=function(itemKey){
      $scope.currentItem=$cookies.get(itemKey);
    };

    $scope.getItemValue=function(itemKey){
      return $cookies.get(itemKey);
    };

    $scope.removeItem=function(itemKey){
      //filter out the keys whose key is not equal to itemkey.
      $scope.keys=$scope.keys.filter(function(key){
        return(key !== itemKey);
      });
      $cookies.remove(itemKey);
    }
})

