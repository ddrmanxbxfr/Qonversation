QonversationApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partials/login.html',
      controller: 'QonversationCtrl',
      title: 'Login'
    })
      .
    when('/room', {
      templateUrl: 'partials/room.html',
      controller: 'RoomCtrl',
      title: 'Room'
    })
      .
    when('/chat', {
      templateUrl: 'partials/chat.html',
      controller: 'ChatCtrl',
      title: 'Chat'
    })
      .
    when('/dash', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl',
      title: 'Dashboard'
    })
    .
  when('/register', {
    templateUrl: 'partials/register.html',
    controller: 'RegisterCtrl',
    title: 'Register'
  })
  }
]);

QonversationApp.run(function($rootScope,$route) {
  $rootScope.page_title = 'Qonversation';
  $rootScope.$on('$routeChangeSuccess', function() {
     $rootScope.page_title = $route.current.title;
   });
});
