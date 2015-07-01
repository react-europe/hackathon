/**
 * Meetup Oauth Service
 * Handle oauth access through meetup api
 */

var React = require('react-native');
var Config = require('../config.js');
var { LinkingIOS } = React;
var qs = require('shitty-qs');
var Promise = require('bluebird');

var MeetupOauthService = {
  requestAccess: function() {
    var meetupUrl = [
      'https://secure.meetup.com/oauth2/authorize',
      '?response_type=code',
      '&client_id=' + Config.meetup_key,
      '&redirect_uri=reactwars://callback'
    ].join('')

    return new Promise(function(resolve, reject) {
      LinkingIOS.addEventListener('url', this.handleCallback.bind(null, resolve, reject));
      LinkingIOS.openURL(meetupUrl);
    }.bind(this));
  },

  handleCallback: function(resolve, reject, e) {
    LinkingIOS.removeEventListener('url', this.handleCallback);
    // TODO: Treat denial // TODO: Add and validate state
    resolve(
      // I'm playing god
      // XXX: Don't do this at home
      qs(e.url.split('?')[1])
    );
  }
};

MeetupOauthService.handleCallback =
  MeetupOauthService.handleCallback.bind(MeetupOauthService);

module.exports = MeetupOauthService;




