QonversationApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partials/login.html',
      controller: 'QonversationCtrl'
    })
      .
    when('/room', {
      templateUrl: 'partials/room.html',
      controller: 'RoomCtrl'
    })
      .
    when('/chat', {
      templateUrl: 'partials/chat.html',
      controller: 'ChatCtrl'
    })
      .
    when('/dash', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl'
    })
  }
]);