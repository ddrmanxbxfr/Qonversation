// Page d'index
QonversationApp.controller('QonversationCtrl', function ($scope, $http, $location, authentication) {
  // Include de la page
  //$scope.template = { name: 'login.html', url: 'partials/login.html'};

   $scope.login = function (username, password) {
    if ( username === 'admin' && password === '1234') {
        authentication.isAuthenticated = true;
        authentication.user = username;
        $location.path('/room');
    } else {
        $scope.loginError = "Invalid username/password combination";
    };
  };
});

// Page de creation room
QonversationApp.controller('RoomCtrl', function ($scope, $http, $location, authentication) {
  $scope.username = authentication.user
  $scope.createRoom = function (roomName) {
    console.log('yo from room page');
  };

  //$scope.username = authentication.user;
  //$scope.template = { name: 'room.html', url: 'partials/room.html'};
});
