"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'GoogleMapsChart',

  componentDidMount: function () {
    var mapOptions = {
      center: {lat: 48.8721388, lng: 2.3411542}, // Mozilla Paris HQ
      zoom: 12
    };
    var map = new google.maps.Map(
        React.findDOMNode(this),
        mapOptions
    );

    //google.maps.event.addDomListener(window, 'load', initialize);

  },

  render() {
    return (
        <div id="google-maps" className="google-maps-chart">
        </div>
    )
  }
});