// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

//-------------------------------normal ----------------------------------
/*
.controller("AppCtrl",function($scope){
  function add(x,y){
    return x+y;
  }
  $scope.result=add(5,2);
})
*/

//----------------------------use callback----------------------------------
//we do not know when the result will be ready, so we use callback
//add a third param,callback, it is a function
//when the result is ready, we can invoke the callback function passiong the result.
//Passing a function as a callback, function-as-object concept is 
//that you can pass code to another function in the same way you would pass a regular variable or object 
//(because the code is literally just an object).
/*
.controller("AppCtrl",function($scope){
  function add(x,y,callback){
    callback(x+y);
  }

  add(5,2,function(result){
      $scope.result=result;
  })
*/
//-------------------------Use $timeout service make delay--------------------------------------
/*
.controller("AppCtrl",function($scope, $timeout){
  function add(x,y,callback){
    $timeout(function() {
      callback(x+y);
    }, 1000);
    
  }
  var startTime=Date.now();
  add(5,2,function(result){
      $scope.result=result;
      $scope.elapsedTime=Date.now()-startTime;
  })

  add(5,2,function(result){
      add(result,4,function(result){
        $scope.result=result;
        $scope.elapsedTime=Date.now()-startTime;
      }),function(err){hadle error};
  }),function(err){hadle error};
*/
//-------------------------Use promise--------------------------------------

// .controller("AppCtrl",function($scope, $timeout){
//   function add(x,y){
//     //return a promise
//     return $timeout(function() {
//       return x+y;
//     }, 1000);
//   }
//   var startTime=Date.now();
  
//   var promise=add(5,2);
//   promise.then(function(result){
//     $scope.result=result;
//     $scope.elapsedTime=Date.now()-startTime;
//   });
  
//   add(5,2)
//   //make promise chaining and make two calls
//   //each .then can make a new promise by taking the result of the previous promise
//   //and transfer it into a new result
//   .then(function(result){
//     return add(result,3)
//   })
//   .then(function(result){
//     $scope.result=result;
//     $scope.elapsedTime=Date.now()-startTime;
//   });

//-------------------------Use angular $q--------------------------------------
.controller("AppCtrl",function($scope, $q){
  function add(x,y){
    //return an object q that we can used to create promise
    var q=$q.defer();
    setTimeout(function() {
      var result=x+y;
      if(result >=0){
        q.resolve(x+y)
      }else{
        q.reject('negtive result' + result)
      }
    }, 100);
    return q.promise;
  }
  var startTime=Date.now();
  
 add(5,2)

  .then(function(result){
    console.log("1st then");
    return add(result,3);
  })

  .then(function(result){
    console.log("2nd then");
    return add(result,-100);
  },function(failure){
    console.log("2nd then failure");
  })

  .then(function(result){
    console.log("3rd then");
    $scope.result=result;
  })

  .catch(function(failure){
    $scope.failure=failure;
  })

  .finally(function(){
    $scope.elapsedTime=Date.now()-startTime;
  });

//---------------------------------------------------------------------
//-------------------callback example BEGIN----------------------------
//callback function
//A callback is a function that is passed as an argument to another function and is executed after its parent function has completed. The special thing about a callback is that functions that appear after the "parent" can execute before the callback executes. Another important thing to know is how to properly pass the callback. This is where I have often forgotten the proper syntax.
//函数A作为参数(函数引用)传递到另一个函数B中，并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。
//一个同步(阻塞)中使用回调的例子，目的是在func1代码执行完成后执行func2。
/*
var func1=function(callback){
    //do something.
    (callback && typeof(callback) === "function") && callback();
}
var func2=function(){};
func1(func2);
//异步回调的例子：
$(document).ready(callback);

$.ajax({
  url: "test.html",
  context: document.body
}).done(function() { 
  $(this).addClass("done");
}).fail(function() { alert("error");
}).always(function() { alert("complete"); 
});
/**
注意的是，ajax请求确实是异步的,不过这请求是由浏览器新开一个线程请求,当请求的状态变更时,如果先前已设置回调,这异步线程就产生状态变更事件放到 JavaScript引擎的处理队列中等待处理。见：http://www.phpv.net/html/1700.html

//setTimeout的延迟时间为0，这个hack经常被用到，settimeout调用的函数其实就是一个callback的体现

/*
Functions are objects

To understand callback functions you first have to understand regular functions. 
This might seen like a “duh” thing to say, but functions in Javascript are a bit different 
than (for example) methods in Java. Functions in Javascript are first-class, 
and are actually objects.
  */
  //A callback function is executed after the current effect is 100% finished.
  //callback example 1 
  //callback is asynchronous 
  let x=function(){console.log("i am called inside a function")}
  let y=function(callback){
    console.log("do something");
    callback();
  }
  y(x);
  //callback example 2
  let sum=function(a,b){
    return a+b;
  }
  let multiply=function(a,b){
    return a*b;
  }
  let divide=function(a,b){
    return a/b;
  }
  let doWhatever=function(a,b){
    console.log('here is two numbers back ${a} , ${b}');
  }  
  let calc=function(num1,num2,callback){
    if(typeof(callback)==="function"){
      return callback(num1, num2);
    }
  }
  console.log(calc(2,3,multiply));//output 6
  console.log(calc(2,3,function(a,b){
    return a*b;
  }))//output 6



  //another example
  var myArr=[{
    num:5,
    str:'apple'
  },{
    num:7,
    str:'cabbage'
  },{
    num:1,
    str:'ban'
  }];

//sort descending by str
  myArr.sort(function(val1,val2){
    if(val1.str>val2.str){
      return -1;
    }else{
      return 1;
    }
  });
  console.log(myArr);
  //-------------------callback example END----------------------------
  //-------------------jQuery callback BEGIN---------------------------
  //jQuery Callback Function
  //$(selector).hide(speed,callback);
  /*
  $("button").click(function(){
    $("p").hide("slow", function(){
      alert("The paragraph is now hidden");
    });
  });
  */
  //-------------------jQuery callback END---------------------------
})

