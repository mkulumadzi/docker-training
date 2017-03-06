var ideasApp = angular.module('ideasApp', []);

function ideasController($scope, $http) {
  $scope.formData = {};

  // Get existing ideas and display them.
  $http.get('http://192.168.99.100:8080/ideas')
    .success(function(data) {
      $scope.ideas = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Create a new idea
  $scope.createIdea = function() {
    $http.post('http://192.168.99.100:8080/ideas', $scope.formData)
    .success(function(data) {
      $scope.formData = {}; // Clear the form data
      $scope.totos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

}
