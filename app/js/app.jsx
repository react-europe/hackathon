"use strict";

var React = require("react");

var GoogleMap = require('./map');

module.exports = React.createClass({
  displayName: 'App',

  render() {
    return (
        <GoogleMap />
    )
  }
});
