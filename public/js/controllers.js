// Page d'index
QonversationApp.controller('QonversationCtrl', function($scope, $http, $location, authentication) {
  // Include de la page
  //$scope.template = { name: 'login.html', url: 'partials/login.html'};

  $scope.login = function(username, password) {
    if (username === 'admin' && password === '1234') {
      authentication.isAuthenticated = true;
      authentication.user = username;
      authentication.status = "Online"
      $location.path('/dash');
    } else {
      $scope.loginError = "Invalid username/password combination";
    };
  };

  $scope.register = function() {
    // Redirection vers la fameuse page de register...
    $location.path('/register');
  }
});

// Page de creation room
QonversationApp.controller('RoomCtrl', function($scope, $http, $location, authentication, chatrooms) {
  updateElementTopBar($scope, authentication, chatrooms);
  updStatus($scope, authentication, chatrooms);
  $scope.createRoom = function(roomName) {
    if (chatrooms.subscribed.indexOf(roomName) === -1) {
      chatrooms.subscribed.push(roomName); // Ajout à la liste de groupes qu'on chat !
    }
    chatrooms.current_chatroom = roomName;
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
  updateElementTopBar($scope, authentication, chatrooms);
  updStatus($scope, authentication, chatrooms);
});



// Page de chat
QonversationApp.controller('ChatCtrl', function($scope, $http, $location, authentication, chatrooms) {
  updateElementTopBar($scope, authentication, chatrooms);
  updStatus($scope, authentication, chatrooms);
  $scope.messages = chatrooms.messages;
  $scope.roomName = chatrooms.current_chatroom;
  $scope.sendMessage = function(messageToSend) {
    sendMessage(messageToSend, authentication.user, chatrooms);
  };
});


function sendMessage($message, $username, chatrooms) {
  var url = 'http://127.0.0.1:1337/message';
  var msgToSend = $username + ':' + $message
  var chName = '/' + chatrooms.current_chatroom;
  client.publish(chName, {
    text: msgToSend
  });
  chatrooms.messages.push(msgToSend);
}

function updateElementTopBar($scope, authentication, chatrooms) {
  // Element du top bar
  $scope.username = authentication.user;
  $scope.online_status = authentication.status;

  // Setup des rooms qu'on à
  $scope.rooms = chatrooms.subscribed; // On les à déjà les rooms.
}

function updStatus($scope, authentication, chatrooms) {
  $scope.updStatus = function($status) {
    authentication.status = $status
    updateElementTopBar($scope, authentication, chatrooms);
  }

  // Fonction pour rediriger vers une chatroom
  $scope.goToChat = function ($roomName) {
    if (chatrooms.subscribed.indexOf($roomName) != -1) {
      chatrooms.current_chatroom = $roomName;
    }
  }
}
