/**
 * Utility functions for API communication
 */

var Config = require('../config.js');
var _ = require('underscore');
var qs = require('shitty-qs');
var Promise = require('bluebird');
var GuildStore = require('../stores/guild.js');
var AppStore = require('../stores/app.js');

var ReactWarsService = {
  createAuth: function(payload) {
    return new Promise(function(resolve, reject) {
      fetch(Config.api + '/auth', {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(function(resp) {
        resolve(JSON.parse(resp._bodyInit).user);
      })
    });
  },

  assignGuild: function(id) {
    var userId = AppStore.state.get('user').id;
    var guild = _.find(GuildStore.state.get('guilds').toJS(), (g) => g.id === id);

    return new Promise(function(resolve, reject) {
      fetch(Config.api + '/users/' + userId+'/assign_guild', {
        method: 'PUT',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({guild: guild})
      }).then(function(resp) {
        resolve(JSON.parse(resp._bodyInit).user)
      })
    });
  }
};

module.exports = ReactWarsService;
