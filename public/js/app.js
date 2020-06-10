var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $scope.check_credentials = function () {
    $http({

      method: "post",
  
      url: "/",
  
      data: {
  
          adress: $scope.input1
  
      },
  }).then(function mySuccess(response) {
    $scope.myDate = response.data;
  });
  
  }
});