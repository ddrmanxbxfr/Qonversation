'use strict';
var QonversationApp = angular.module('Qonversation', ['ngRoute', 'ui.bootstrap']);

QonversationApp.factory('authentication', function() {
  return {
    isAuthenticated: false,
    user: null,
    status: "Offline"
  }
});


QonversationApp.factory('chatrooms', ['$rootScope',
  function($rootScope) {
    var messages = [];
    return {
      subscribed: [],
      addMsg: function($messageToAdd) {
        console.log('got msg!!');
        $rootScope.$apply(function() {
          messages.push($messageToAdd);
        });
      },
      messages: messages
    }
  }
]);