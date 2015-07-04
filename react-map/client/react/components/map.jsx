'use strict';

import React from 'react/addons';
import GoogleMap from 'google-map-react';
import LocationContainer from './location.jsx';
import PureComponent from 'react-pure-render/component';
let coordsCentre = [50.938043, 10.337157];

class MapContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderLocations() {
    let locationImg;
    let selectedClass;
    let locationsContainers = [];
    let locations = this.props.locations;

    for (let location of locations) {
      locationImg = location.photo_urls.thumb === undefined ?
        '/img/meetup-icon.png' :
        location.photo_urls.thumb;

      selectedClass = this.props.currentLocation.id === location.number ? 'selected' : '';

      locationsContainers.push(
        <LocationContainer
          selectedClass={selectedClass}
          currentLocationId={this.props.currentLocation.id}
          key={locations.indexOf(location)}
          lat={location.lat}
          lng={location.lon}
          id={location.number}
          img={locationImg} />
      )
    }
    return locationsContainers;
  }

  render() {
    let locationsContainers = this._renderLocations();
    let currentLocation = this.props.currentLocation;

    return (
      <GoogleMap
        center={this.props.center}
        zoom={0}>
        {locationsContainers}
      </GoogleMap>
    );
  }
}

export default MapContainer;
