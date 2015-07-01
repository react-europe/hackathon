'use strict';

var Flux = require('../lib/flux');
var ReactWarsService = require('../services/react_wars_api.js');
var StorageService = require('../services/storage.js');
var ReactWarsAuthConstants = require('../constants/react_wars_auth.js');

var ReactWarsAuthActionCreator = Flux.createActionCreator({
  login: function(params) {
    ReactWarsService.createAuth(params).then(function(resp) {
      this.dispatchAction(ReactWarsAuthConstants.USER_LOADED, resp)
      StorageService.saveSession(resp);
    }.bind(this))
  }

});

module.exports = ReactWarsAuthActionCreator;
