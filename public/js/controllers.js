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
QonversationApp.controller('RoomCtrl', function ($scope, $http, $location, authentication, chatrooms) {
  updateElementTopBar($scope,authentication);
  $scope.createRoom = function (roomName) {
    chatrooms.subscribed.push(roomName); // Ajout à la liste de groupes qu'on chat !
    $location.path('/chat');
  };
});

// Page de chat
QonversationApp.controller('ChatCtrl', function ($scope, $http, $location, authentication, chatrooms) {
  updateElementTopBar($scope,authentication);
  $scope.roomName = chatrooms.subscribed[0];
});


function updateElementTopBar($scope, authentication) {
  // Element du top bar
    $scope.username = authentication.user
    $scope.online_status = "Status : Online"
}
