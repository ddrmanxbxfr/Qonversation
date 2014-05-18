'use strict';
var QonversationApp = angular.module('Qonversation',['ngRoute','ui.bootstrap']);

QonversationApp.factory('authentication', function() {
  return {
    isAuthenticated: false,
    user: null
  }
});
