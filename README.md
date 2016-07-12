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


# sessionStorage with expiry time

Session storage is a very handy tool for caching content fragments retrieved via AJAX. Once we’ve pulled the content once, and stuffed it into session storage, we can access it again quickly without the overhead of a round trip to the server. But what if we want to limit the age of that content, so that it expires before it gets too stale?

A simple answer is to store the content with a timestamp, so that we know just how old it is. We can then compare that timestamp with the current time and see if the content is past its expiration time.

Of course, we can’t store JavaScript objects in session storage, only strings; luckily, we have JSON which is a string representation of JavaScript objects.

Here’s a JavaScript snippet that pulls content from the server via AJAX and saves it in session storage with a timestamp. On subsequent accesses, it gets the content from session storage, and if it hasn’t expired, it displays it straight away without having to go back to the server with AJAX again. Once the expiration time has been reached, the content is discarded and a new AJAX request is made.

```
/**
* load the content via AJAX,
* and attempt to cache in sessionStorage
*/
(function() {

    var hasStorage = ("sessionStorage" in window && window.sessionStorage),
        storageKey = "yourUniqueStorageKey",
        now, expiration, data = false;

    try {
        if (hasStorage) {
            data = sessionStorage.getItem(storageKey);
            if (data) {
                // extract saved object from JSON encoded string
                data = JSON.parse(data);

                // calculate expiration time for content,
                // to force periodic refresh after 30 minutes
                now = new Date();
                expiration = new Date(data.timestamp);
                expiration.setMinutes(expiration.getMinutes() + 30);

                // ditch the content if too old
                if (now.getTime() > expiration.getTime()) {
                    data = false;
                    sessionStorage.removeItem(storageKey);
                }
            }
        }
    }
    catch (e) {
        data = false;
    }

    if (data) {
        // load data from session storage
        showContent(data.content);
    }
    else {
        // fallback to AJAX loader
        jQuery.ajax({
            type : "GET",
            url : your_ajax_url,
            dataType : "html",
            data : { action: "your-ajax-action" },
            success : function(content, status, xhr) {
                // save in session storage if available
                if (hasStorage) {
                    try {
                        sessionStorage.setItem(storageKey, JSON.stringify({
                            timestamp: new Date(),
                            content: content
                        }));
                    }
                    catch (e) {
                        // silently suppress, it doesn't really matter
                    }
                }

                // show the new content
                showContent(content);
            }
        });
    }
})();

/**
* your function for displaying the content
* @param {String} content
*/
function showContent(content) {
    // your code here...
}
```
# Angular Timeout
set timeout
```
function Ctrl($scope, $timeout) {
    $scope.timeInMs = 0;

    var countUp = function() {
        $scope.timeInMs+= 500;
        $timeout(countUp, 500);
    }

    $timeout(countUp, 500);
}
```
cancel timeout
```
yourTimer = $timeout(function() { /* ... */ }, 5000);
$timeout.cancel(yourTimer);

```
# Angular中的$timeOut定时器

非常不幸的一点是，人们似乎常常将AngularJS中的$timeOut()函数看做是一个内置的、无须在意的函数。但是，如果你忘记了$timeOut()的回调函数将会造成非常不好的影响，你可能会因此遇到代码莫名其妙的出现问题，或者无端抛出一个错误甚至是一遍一遍的重复对的你的服务器进行$http请求这些诡异的情形。管理好你的$timeOut定时器的小技巧就是在$destory事件中将它们取消。

和Javascript中原生的setTimeout()以及setInterval()函数不同，AngularJS中的$timeOut()函数会返回一个promise。和其他的promise一样，你可以绑定$timeOut的resolved和rejected时间。然而更重要的是，你可以通过将这个promise传递给$timeOut.cancel()方法来取消掉潜在的定时器。

在一个AngularJS应用中，这一点非常的重要，因为定时器可以结束执行那些不再与应用状态和用户界面相关的代码。最佳情形中，这些过程都会悄悄的发生；在不好的情况下，它会引起不可预测的行为并导致很差的用户体验。为了让应用顺畅的运行，你应该总是把握好你的$timeOut定时器；你需要在相应的控制器和指令接收到$destory事件时调用$timeOut.cancel()方法。

为了更加清楚的说明这点，下面的这个例子将会有一些DOM元素通过ngSwitch/ngSwitchWhen指令来创建或销毁。注意到当$destory事件被触发时(在这里的例子中是位于指令中)，我们将取消当前的定时器：
```
<!doctype html>
<html ng-app="Demo" ng-controller="DemoController">
<head>
    <meta charset="utf-8" />

    <title>
        Don't Forget To Cancel $timeout Timers In Your $destroy Events In AngularJS
    </title>
</head>
<body>
    <h1>
        Don't Forget To Cancel $timeout Timers In Your $destroy Events In AngularJS
    </h1>
    <p>
        <a href="#" ng-click="toggle()">Toggle Section</a>
    </p>
    <div ng-switch="section">
        <p ng-switch-when="happy" bn-directive>
            Oh sweet!
        </p>
        <p ng-switch-when="sad" bn-directive>
            Oh noes!
        </p>
    </div>
        <!-- Load jQuery and AngularJS. -->
        <script
            type="text/javascript"
            src="../../vendor/jquery/jquery-2.0.3.min.js">
        </script>
        <script
          type="text/javascript"
          src="../../vendor/angularjs/angular-1.0.7.min.js">
        </script>
        <script type="text/javascript">

        //为我们的demo创建一个应用模块
        var app = angular.module( "Demo", [] );
        // -------------------------------------------------- //
        // -------------------------------------------------- //
        // 定义控制器
        app.controller(
            "DemoController",
            function( $scope ) {
                $scope.section = "happy";
                //在toggle函数中改变section的值，以此在标记中显示/隐藏不同的部分
                $scope.toggle = function() {

                    if ( $scope.section === "happy" ) {

                        $scope.section = "sad";

                    } else {

                        $scope.section = "happy";
                    }
                };
            }
        );
        // -------------------------------------------------- //
        // -------------------------------------------------- //
       //定义指令
        app.directive(
            "bnDirective",
            function( $timeout ) {

                                //将用户界面的事件绑定到$scope上
                function link( $scope, element, attributes ) {


                    //当timeout被定义时，它返回一个promise对象
                    var timer = $timeout(
                        function() {

                            console.log( "Timeout executed", Date.now() );

                        },
                        2000
                    );
                    //将resolve/reject处理函数绑定到timer promise上以确保我们的cancel方法能正常运行
                    timer.then(
                        function() {

                            console.log( "Timer resolved!", Date.now() );

                        },
                        function() {

                            console.log( "Timer rejected!", Date.now() );

                        }
                    );
                    //当DOM元素从页面中被移除时，AngularJS将会在scope中触发$destory事件。这让我们可以有机会来cancel任何潜在的定时器
                    $scope.$on(
                        "$destroy",
                        function( event ) {

                            $timeout.cancel( timer );

                        }
                    );

                }
                //返回指令的配置
                return({
                    link: link,
                    scope: false
                });
            }
        );
    </script>
</body>
</html>  
```


# inoic nav view

http://ionicframework.com/docs/api/directive/ionNavView/

## Caching
By default, views are cached to improve performance. When a view is navigated away from, its element is left in the DOM, and its scope is disconnected from the $watch cycle. When navigating to a view that is already cached, its scope is then reconnected, and the existing element that was left in the DOM becomes the active view. This also allows for the scroll position of previous views to be maintained.

Caching can be disabled and enabled in multiple ways. By default, Ionic will cache a maximum of 10 views, and not only can this be configured, but apps can also explicitly state which views should and should not be cached.
```
var myApp = angular.module('reallyCoolApp', ['ionic']);

myApp.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);

  // note that you can also chain configs
  $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
});
```
