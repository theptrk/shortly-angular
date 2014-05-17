// ANGULEUR
angular.module('myApp', [])

.controller('linkController', function($scope, $http){
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
})

.controller('submitController', function($scope, $http){
  $scope.submit = function(){
    console.log($scope.text);
    console.log($scope);
    $http({
      method:'POST',
      data:{url: $scope.text},
      url:'/links'
    }).success(function(data, status){
      console.log('posted!')
    }).error(function(data, status){});
  };
})
