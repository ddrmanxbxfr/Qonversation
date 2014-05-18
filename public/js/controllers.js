var QonversationApp = angular.module('Qonversation',['ngRoute','ui.bootstrap']);

// Page d'index
QonversationApp.controller('QonversationCtrl', function ($scope) {
    //$scope.username = $routeParams.username;
});

// Controlleur pour le choix des rooms de groupe
QonversationApp.controller('RoomCtrl', function ($scope) {
  $scope.username = "WhatsUp"
});
