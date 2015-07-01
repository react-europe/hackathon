'use strict';

var Flux = require('../lib/flux');
var GuildService = require('../services/guild.js');
var ReactWarsApiService = require('../services/react_wars_api.js');
var GuildConstants = require('../constants/guild.js');
var AppConstants = require('../constants/app.js');
var AppStore = require('../stores/app.js');
var StorageService = require('../services/storage.js');

var GuildActionCreator = Flux.createActionCreator({
  loadGuilds: function() {
    GuildService.load({
      token: AppStore.state.get('user').meetup_access_token,
      member_id: AppStore.state.get('user').meetup_member_id
    }).then((guilds) => {
      this.dispatchAction(GuildConstants.LOADED_GUILDS, guilds)
    });
  },

  assignGuild: function(id) {
    ReactWarsApiService.assignGuild(id).then((user) => {
      StorageService.saveSession(user);
      this.dispatchAction(AppConstants.USER_UPDATED, user);
    });
  }
});

module.exports = GuildActionCreator;
