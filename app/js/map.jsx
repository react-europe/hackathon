"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: 'GoogleMapsChart',

  getInitialState: function() {
    return {
      map: undefined
    };
  },

  componentDidMount: function () {
    this._initMap();
  },

  _initMap() {
    var mapOptions = {
      center: {lat: 48.8721388, lng: 2.3411542}, // Mozilla Paris HQ
      zoom: 10
    };
    var map = new google.maps.Map(
        React.findDOMNode(this),
        mapOptions
    );

    this.setState({
      map: map
    });
  },

  _insertMarkers(data) {
    var map = this.state.map;
    if (map) {
      data.forEach((member) => {
        this._addMarkerToMap(member);
      });
    }
  },

  /**
   * required properties in markerData
   * lat: marker latitude
   * lon: marker longitude
   * name: onHover string for the marker
   */
  _addMarkerToMap(markerData, map) {
    new google.maps.Marker({
      position: new google.maps.LatLng(markerData.get('lat'), markerData.get('lon')),
      map: map,
      title: markerData.get('name')
    });
  },

  render() {
    this._insertMarkers(this.props.data);

    return (
        <div id="google-maps" className="google-maps-chart">
        </div>
    )
  }
});