# angular_ionic_learning

#how to filter an array(filter the params) with javascript.

    $scope.removeItem=function(itemKey){
      //filter out the keys whose key is not equal to itemkey.
      $scope.keys=$scope.keys.filter(function(key){
        return(key !== itemKey);
      });
      $cookies.remove(itemKey);
    }
#iterate all the key value pairs in array
    angular.forEach(cookies, function (v, k) {
      $scope.keys.push(v);
    });


#$resource service

.controller('ProfileCtrl', function ($scope, UserService, ResourceService) {
    console.log("testService BEGIN");
    ResourceService.query(function (result) {
        console.log(result);
        $scope.datas = result;
    });
    
    
#pass data use factory

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
  
 
