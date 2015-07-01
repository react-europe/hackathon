"use strict";

var request = require('superagent');
var Immutable = require('immutable');

var Http = {

  /**
   * Gets JSON data from a given URL.
   */
  get(url, params, callback) {
    if (!callback) {
      callback = params;
      params = {};
    }

    request
      .get(url)
      .query(params)
      .end(function(result) {
        if (result.ok) {
          var pageData;
          if (result.body) {
            pageData = Immutable.fromJS(result.body);
          } else {
            pageData = Immutable.fromJS(JSON.parse(result.text));
          }
        }
        if (pageData) {
          callback(pageData);
        }
      });
  }
};

module.exports = Http;
