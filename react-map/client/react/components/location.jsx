'use strict';

import React from 'react/addons';
import {PropTypes} from 'react/addons';
import PureComponent from 'react-pure-render/component';
import {LocationContainerStyle} from './../styles/styles';

class LocationContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 'hover': false };
  }

  _handleMouseEnter() {
    this.setState({ 'hover': true });
  }

  _handleMouseLeave() {
    this.setState({ 'hover': false });
  }

  render() {
    let locationData;
    let imgUrl = this.props.img;
    let id = this.props.id;
    let pinClass = this.state.hover ? 'selected ' : '';

    LocationContainerStyle.backgroundImage = `url(${imgUrl})`;
    LocationContainerStyle.border = this.props.selectedClass ? '2px solid #000' : '2px solid #f44336';

    if (this.props.selectedClass) {
      pinClass += 'selected';
    }

    return (
      <div
        className={pinClass}
        style={LocationContainerStyle}
        onMouseEnter={this._handleMouseEnter.bind(this)}
        onMouseLeave={this._handleMouseLeave.bind(this)} />
    );
  }
}

LocationContainer.defaultProps = {};

export default LocationContainer;
