'use strict';

var Flux = require('../lib/flux');
var AppConstants = require('../constants/app.js');
var ReactWarsAuthConstants = require('../constants/react_wars_auth.js');
var StorageService = require('../services/storage.js');

var AppActionCreator = Flux.createActionCreator({
  init: function() {
    // StorageService.loadSession().then((user) => {
    //   this.dispatchAction(ReactWarsAuthConstants.USER_LOADED, user);
    // }).finally(() => {
    // });
    this.dispatchAction(AppConstants.INIT)

  }
});

module.exports = AppActionCreator;
