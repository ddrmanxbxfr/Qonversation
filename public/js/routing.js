QonversationApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/login.html'
  }).
  when('/room', {
    templateUrl: 'partials/room.html'
  }
)
}]);
