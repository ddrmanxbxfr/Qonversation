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
    var current_messages = [];
    return {
      subscribed: [],
      current_chatroom: "",
      messages: messages,
      current_messages: current_messages,
      // Fonction qui ajoute les message et trigger un digest cycle.
      addMsg: function($messageToAdd, $current_chatroom) {
        $rootScope.$apply(function() {
          messages.push($messageToAdd);
          if ($messageToAdd.channel === $current_chatroom)
            current_messages.push($messageToAdd.text);
        });
      },
      getMessages: function($chatroomName) {
        current_messages.length = 0;
        for (var iCpt = 0; iCpt < messages.length; iCpt++) {
          if (messages[iCpt].channel === $chatroomName) {
            current_messages.push(messages[iCpt].text);
          }
        }
      }
    }
  }
]);
