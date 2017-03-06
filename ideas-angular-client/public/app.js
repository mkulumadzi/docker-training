var ideasApp = angular.module('ideasApp', []);

function ideasController($scope, $http) {
  $scope.formData = {};

  // Create a new idea
  $scope.createIdea = function() {
    $http.post('/api/ideas', $scope.formData)
    .success(function(data) {
      $scope.formData = {}; // Clear the form data
      $scope.loadData();
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // Load data
  $scope.loadData = function() {
    $http.get('/api/ideas')
      .success(function(data) {
        $scope.ideas = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Initial load
  $scope.loadData();

}
