'use strict';

import React from 'react/addons';
import Header from './components/header';
import MapContainer from './components/map';
import CitiesContainer from './components/sidebar';
import {MapContainerStyle, CitiesContainerStyle} from './styles/styles';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      currentLocation:  {
        lat: 48.86,
        lng: 2.34,
        id: 779
      }
    };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(res) {
        this.setState({ locations: res });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }

  _handleClick(locationInfo) {
    return this.setState({ currentLocation: locationInfo });
  }

  render() {
    let coordsCentre = [this.state.currentLocation.lat, this.state.currentLocation.lng];

    return (
      <div>
        <Header />
        <div>
          <div style={MapContainerStyle}>
            <MapContainer
              center={coordsCentre}
              currentLocation={this.state.currentLocation}
              onChildClick={this._handleClick.bind(this)}
              locations={this.state.locations}/>
          </div>
          <div style={CitiesContainerStyle}>
            <CitiesContainer
              onChildClick={this._handleClick.bind(this)}
              currentLocation={this.state.currentLocation}
              locations={this.state.locations} />
          </div>
        </div>
      </div>
    )
  }
}

React.render(<App url='/groups.json'/>, document.getElementById('main'));
