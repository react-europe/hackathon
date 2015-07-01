var Flux = require('../lib/flux')
  , I = require('immutable')
  , _ = require('underscore')
  , ReactWarsAuthConstants = require('../constants/react_wars_auth.js')
  , AppConstants = require('../constants/app.js');

var AppStore = Flux.createStore({
  name: 'app',
  getInitialState: function() {
    return {
      initialized: false,
      logged_in: false,
      onboarded: false,
      user: null
    };
  },

  actions: [
    [ReactWarsAuthConstants.USER_LOADED, function(user) {
      this.state = this.state.set('logged_in', true);
      this.state = this.state.set(
        'onboarded', user.onboarded
      );
      this.state = this.state.set('user', user);
    }],
    [AppConstants.INIT, function() {
      this.state = this.state.set('initialized', true);
    }],
    [AppConstants.USER_UPDATED, function(user) {
      debugger
      this.state = this.state.set('logged_in', true);
      this.state = this.state.set(
        'onboarded', user.onboarded
      );
      this.state = this.state.set('user', user);
    }],

  ]
});

module.exports = AppStore;


