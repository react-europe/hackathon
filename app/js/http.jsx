"use strict";

var request = require('superagent');
var Immutable = require('immutable');

var Http = {

  /**
   * Gets JSON data from a given URL.
   *
   * @param url The URL to be used for getting the data.
   * @param callback Callback function that will be called after successful fetching of the data.
   */
  get(url, callback) {
    request
      .get(url)
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
