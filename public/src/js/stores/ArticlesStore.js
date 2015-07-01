'use strict';

var Reflux             = require('reflux');
var AppActions = require('../actions/AppActions');
var $            = require('jquery');
var Q = require('q');

var ArticlesStore = Reflux.createStore({
  submissions : [],
  is_loaded: false,
  init: function() {
    this.listenTo(AppActions.getSubmissionsData, this.getSubmissionsData);
  },

  getSubmissionsData: function() {
    if (this.is_loaded) {
      deferred.resolve(this.submissions);
      return deferred.promise;
    }
    var self = this;
    var deferred= Q.defer();
    $.get('http://localhost:5000/', function(response) {
      self.submissions = response.result;
      self.is_loaded =
      deferred.resolve(response.result);
    },'json');
    return deferred.promise;
  },
  getDefaultData: function() {
    return self.submissions
  }
});

module.exports = ArticlesStore;