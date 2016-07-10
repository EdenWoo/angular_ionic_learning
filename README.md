# how to use MarkDown
https://guides.github.com/features/mastering-markdown/

# angular_ionic_learning

# how to filter an array(filter the params) with javascript.
```
$scope.removeItem=function(itemKey){
  //filter out the keys whose key is not equal to itemkey.
  $scope.keys=$scope.keys.filter(function(key){
    return(key !== itemKey);
  });
  $cookies.remove(itemKey);
}
```  
# iterate all the key value pairs in array
```
angular.forEach(cookies, function (v, k) {
      $scope.keys.push(v);
    });

    angular.forEach(cookies, function (v, k) {
      $scope.keys.push(v);
    });

```
# $resource service
```
.controller('ProfileCtrl', function ($scope, UserService, ResourceService) {
    console.log("testService BEGIN");
    ResourceService.query(function (result) {
        console.log(result);
        $scope.datas = result;
    });
```
# pass data use factory
```
//-------------------- Service BEGIN------------------
//inspect all our http call,
.factory('UserInfoService', function () {
    var info = {};

    var setInfo=function(i){
        info = i;
    }

    var getInfo = function () {
        return info;
    }
    return {
        setInfo: setInfo,
        getInfo:getInfo
    };
})
 //-------------------- Service END------------------

  UserInfoService.setInfo(info);
   $scope.data = UserInfoService.getInfo();

```

# rootscope 广播
Instead of having your menu in $rootScope, you could use event to warn your menu that the user has logged in and that he should reload itself.

On LoginController
```
$rootScope.$broadcast('userLoggedIn');
On MainController

$rootScope.$on('userLoggedIn', function () {
    //Code to apply modification to your menu
});
If you have to pass parameters, you can use the second argument of $broadcast method like this :

$rootScope.$broadcast('userLoggedIn', {key: 'value'});

$rootScope.$on('userLoggedIn', function (params) {
    console.log(params.key); //value
});
```

# angular localstorage-ngstorage

link:http://ngmodules.org/modules/ngStorage
bower install ngstorage
```
angular.module('app', [
    'ngStorage'
]).controller('Ctrl', function(
    $scope,
    $localStorage,
    $sessionStorage
){});

set item:
    $window.sessionStorage.setItem("isAuthenticated", true);
set json item:
 var image = document.getElementById('img'+id);
        json = {
          id: id,
          img: image.src
        }
 $window.sessionStorage.setItem(id, JSON.stringify(json));

iterate all the data in the sessionstorage
     angular.forEach($window.sessionStorage, function (i, v) {
         console.log("value: " + i);
         console.log("item: " + v);
    });
```

```
window.addCart = function($scope, $http, $window, $document){

    var getValue = function(){
        return $window.sessionStorage.length;
    }

    var getData = function(){
      var json = [];
      $.each($window.sessionStorage, function(i, v){
        json.push(angular.fromJson(v));
      });
      return json;
    }

    $scope.images = getData();
    $scope.count = getValue();

    $scope.addItem = function(id){
        var image = document.getElementById('img'+id);
        json = {
          id: id,
          img: image.src
        }
        $window.sessionStorage.setItem(id, JSON.stringify(json));
        $scope.count = getValue();
        $scope.images = getData();
    }

    $scope.removeItem = function(id){
      $window.sessionStorage.removeItem(id);
      $document.
      $scope.count = getValue();
      $scope.images = getData();
      alert('Removed with Success!');
    }
}
```
