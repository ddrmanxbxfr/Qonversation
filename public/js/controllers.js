var QonversationApp = angular.module('Qonversation',['ngRoute','ui.bootstrap']);

// Page d'index
QonversationApp.controller('QonversationCtrl', function ($scope) {
  // Include du menu
  $scope.templates = [{ name: 'login.html', url: 'partials/login.html'},
                    { name: 'room.html', url: 'partials/room.html'}];
  $scope.template = $scope.templates[0];

   $scope.login = function (username, password) {
    if ( username === 'admin' && password === '1234') {
        //authentication.isAuthenticated = true;
        $scope.template = $scope.templates[1];
        $scope.username = username;
    } else {
        $scope.loginError = "Invalid username/password combination";
    };
  };
});
