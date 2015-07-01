"use strict";

var objectAssign = require('object-assign');
var request = require('superagent');
var Immutable = require('immutable');

/**
 * @constructor
 */
var Http = function () {
  this.displayName = "Http";
};

objectAssign(Http.prototype, {

  /**
   * Gets JSON data from a given URL.
   *
   * @param url The URL to be used for getting the data.
   * @param callback Callback function that will be called after successful fetching of the data.
   */
  get(url, callback) {
    request
        .get(url)
        .end(function (result) {
          if (result.ok) {
            var pageData;
            if (result.body) {
              pageData = Immutable.fromJS(result.body);
            } else {
              // if the type was text/html (but json is returned)
              // we try to parse it manually
              pageData = Immutable.fromJS(JSON.parse(result.text));
            }
          }
          if (pageData) {
            callback(pageData);
          }
        });
  }
});

module.exports = Http;