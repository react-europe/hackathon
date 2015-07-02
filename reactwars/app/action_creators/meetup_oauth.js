'use strict';

var Flux = require('../lib/flux');
var MeetupOauthService = require('../services/meetup_oauth.js');
var ReactWarsAuthActionCreator = require('../action_creators/react_wars_auth.js');

var MeetupOauthActionCreator = Flux.createActionCreator({
  requestAccess: function() {
    MeetupOauthService.requestAccess().then(function(params) {
      ReactWarsAuthActionCreator.login(params);
    })
  }
});

module.exports = MeetupOauthActionCreator;

