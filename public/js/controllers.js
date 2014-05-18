var QonversationApp = angular.module('Qonversation',['ngRoute','ui.bootstrap']);

// Page d'index
QonversationApp.controller('QonversationCtrl', function ($scope) {
  //$scope.username = $routeParams.username;

  // Include du menu
  $scope.template = { name: 'menuLoggedIn.html', url: 'partials/menuLoggedIn.html'};
});

// Controlleur pour le choix des rooms de groupe
QonversationApp.controller('RoomCtrl', function ($location, $rootScope) {
  $rootScope.username= 'Acceso';
});
