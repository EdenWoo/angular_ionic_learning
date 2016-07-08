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
angular.module('starter')
 //--------------------test resource BEGIN-------------------------
 .factory('ResourceService', function($resource){
  //$resource(url, paramDefaults, actions)
  return $resource(             
    'http://jsonplaceholder.typicode.com/users/:id',
    {id:'@id'}, 
    { 
      //this method issues a PUT request
      update: { method: 'PUT'}
    });
})

//consume the service.
.controller('ProfileCtrl', function ($scope, ResourceService) {
    console.log("testService BEGIN");
    ResourceService.query(function (result) {
        console.log(result);
        $scope.datas = result;
    });
