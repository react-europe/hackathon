var Flux = require('../lib/flux');
var I = require('immutable')
var GuildConstants = require('../constants/guild.js');

var GuildStore = Flux.createStore({
  name: 'guild',
  getInitialState: function() {
    return {
      loading: false,
      guilds: []
    };
  },

  actions: [
    [GuildConstants.LOADED_GUILDS, function(guilds) {
      this.state = this.state.set('guilds', I.fromJS(guilds))
    }]
  ]
});

module.exports = GuildStore;

