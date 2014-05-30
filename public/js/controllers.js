// Page d'index
QonversationApp.controller('QonversationCtrl', function($scope, $http, $location, authentication) {
  // Include de la page
  //$scope.template = { name: 'login.html', url: 'partials/login.html'};

  $scope.login = function(username, password) {
    if (username === 'admin' && password === '1234') {
      authentication.isAuthenticated = true;
      authentication.user = username;
      $location.path('/dash');
    } else {
      $scope.loginError = "Invalid username/password combination";
    };
  };
});

// Page de creation room
QonversationApp.controller('RoomCtrl', function($scope, $http, $location, authentication, chatrooms) {
  updateElementTopBar($scope, authentication);
  $scope.createRoom = function(roomName) {
    chatrooms.subscribed.push(roomName); // Ajout à la liste de groupes qu'on chat !
    var channelFaye = '/' + roomName;
    client.subscribe(channelFaye, function(message) {
      var splt = message.text.split(":")
      if (splt[0] != authentication.user) // 0 c'est  le username 1 message
        chatrooms.addMsg(message.text);
    });
    $location.path('/chat');
  };
});

// Page du dashboard
QonversationApp.controller('DashboardCtrl', function($scope, $http, $location, authentication, chatrooms) {
  updateElementTopBar($scope, authentication);
});

// Page de chat
QonversationApp.controller('ChatCtrl', function($scope, $http, $location, authentication, chatrooms) {
  updateElementTopBar($scope, authentication);
  $scope.messages = chatrooms.messages;
  $scope.roomName = chatrooms.subscribed[0]; // Pour l'instant uniquement le premier chatroom
  $scope.sendMessage = function(messageToSend) {
    sendMessage(messageToSend, authentication.user, chatrooms);
  };
});


function sendMessage($message, $username, chatrooms) {
  var url = 'http://127.0.0.1:1337/message';
  var msgToSend = $username + ':' + $message
  client.publish('/channel', {
    text: msgToSend
  });
  chatrooms.messages.push(msgToSend);
}

function updateElementTopBar($scope, authentication) {
  // Element du top bar
  $scope.username = authentication.user;
  $scope.online_status = "Status : Online";
}