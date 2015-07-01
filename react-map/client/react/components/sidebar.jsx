'use strict';

import React from 'react/addons';
import { List, ListItem, Avatar } from 'material-ui';
import {cityStyle, membersStyle} from './../styles/styles';

let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();
window.React = React;

class CitiesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  }

  _handleClick(locationData) {
    this.props.onChildClick(locationData);
  }

  _renderCities() {
    let locationImg;
    let locationData;
    let citiesContainers = [];
    let locations = this.props.locations;
    let currentLocation = this.props.currentLocation;

    for (let location of locations) {
      locationImg = location.photo_urls.thumb === undefined ?
        '/img/meetup-icon.png' :
        location.photo_urls.thumb;

      locationData = {
        lat: location.lat,
        lng: location.lon,
        id: location.number
      };

      citiesContainers.push(
        <ListItem
          onClick={this._handleClick.bind(this, locationData)}
          leftAvatar={<Avatar src={locationImg} />}
          secondaryText={
            <p>
              <span style={cityStyle}>{location.city}</span>
              <span style={membersStyle}>&nbsp; {location.member_count} members</span>
            </p>
          }
          key={locations.indexOf(location)}>{location.name}&nbsp;</ListItem>
      )
    }
    return citiesContainers;
  }

  render() {
    let cityListItems = this._renderCities();

    return (
      <List>
        {cityListItems}
      </List>
    );
  }
}

CitiesContainer.childContextTypes = { muiTheme: React.PropTypes.object };

export default CitiesContainer;
