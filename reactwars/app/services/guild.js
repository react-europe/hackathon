/**
 * Utility functions for API getting all guilds
 */

var Config = require('../config.js');
var Promise = require('bluebird');

var GuildService = {
  load: function(params) {
    var groupsUrl =
      Config.meetup_api + '/2/groups' +
        '?access_token='+params.token+
        '&member_id='+params.member_id+
        '&topic='+Config.meetup_group_topics+
        '&page=5';
    return new Promise(function(resolve, reject) {
      fetch(groupsUrl, {
        method: 'GET',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        }
      }).then((resp) => {
        resolve(JSON.parse(resp._bodyInit).results);
      })
    });
  }
};

module.exports = GuildService;
