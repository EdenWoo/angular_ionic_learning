# angular_ionic_learning

#how to filter an array(filter the params) with javascript.

    $scope.removeItem=function(itemKey){
      //filter out the keys whose key is not equal to itemkey.
      $scope.keys=$scope.keys.filter(function(key){
        return(key !== itemKey);
      });
      $cookies.remove(itemKey);
    }
