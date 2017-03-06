var ideasApp = angular.module('ideasApp', []);

function ideasController($scope, $http) {
  $scope.formData = {};

  // Get existing ideas and display them.
  $http.get('/api/ideas')
    .success(function(data) {
      $scope.ideas = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Create a new idea
  $scope.createIdea = function() {
    $http.post('/api/ideas', $scope.formData)
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
