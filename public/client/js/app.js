// ANGULEUR
angular.module('myApp', ['ngRoute', 'ngAnimate', 'fx.animations'])

.controller('linkController', ['$scope', '$http', function($scope, $http){
  $scope.name = "patrick"
  $http({
    method:'GET',
    url:'/links'
  }).success(function(data, status){
    $scope.links = data;
    console.log(data);
  }).error(function(data, status){
    console.log('error');
  });
}])

.controller('submitController', ['$scope', '$http', function($scope, $http){
  $scope.shouldShow = false;
  $scope.submit = function(){
    console.log($scope.text);
    console.log($scope);
    $scope.shouldShow = true;
    $http({
      method:'POST',
      data:{url: $scope.text},
      url:'/links'
    }).success(function(data, status){
      console.log('posted!');
      $scope.shouldShow = false;
      $scope.text = '';
    }).error(function(data, status){});
  };
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/client/templates/home.html', // add real url
      controller: 'linkController' // add real controller
    })
    .when('/create', {
      templateUrl: '/client/templates/shorten.html', // add real url
      controller: 'submitController' // add real controller
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
