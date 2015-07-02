'use strict';

var React = require('react-native');
var Promise = require('bluebird');

var StorageService = {
  loadSession: function() {
    return new Promise(function(resolve, reject) {
      React.AsyncStorage.getItem('user').then(function(resp) {
        resolve(JSON.parse(resp));
      }).catch(reject);
    })
  },

  saveSession: function(user) {
    return React.AsyncStorage.setItem('user', JSON.stringify(user));
  }
};

module.exports = StorageService;
