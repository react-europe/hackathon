/**
 * Meetup store.
 *
 * @author Rob Gietema
 * @licstart  The following is the entire license notice for the JavaScript
 *            code in this page.
 *
 * Copyright (C) 2015 Rob Gietema
 *
 * @licence The above is the entire license notice for the JavaScript code in
 *          this page.
 * @version 0.0.1
 */

import React from 'react';
import Marty from 'marty';

import MeetupsConstants from '../../constants/MeetupsConstants';

/**
 * This class defines the Meetup Store.
 *
 * @class MeetupStore
 */
class MeetupStore extends Marty.Store {
  
  /**
   * Class constructor.
   *
   * @method constructor
   * @constructor
   */
  constructor(options) {
    super(options);
    
    this.handlers = {
      setMeetups: MeetupsConstants.MEETUPS
    };
    
    this.state = {
      meetups: []
    }
    
    this.count = 0;
  }

  /**
   * Get the meetups.
   *
   * @method getMeetups
   * @return {Array} Array of meetups
   */
  getMeetups() {
    return this.state.meetups;
  }

  /**
   * Set meetups.
   *
   * @method setMeetups
   * @param {Object} data Meetup date
   */  
  setMeetups(data) {
    let meetups = _.each( data, function( meetup ) {
      meetup.x = Math.floor((454 + (meetup.lon * 2.52)) / 48);
      meetup.y = Math.floor((381 - (meetup.lat * 2.39)) / 48);
    });
    
    this.state.meetups = _.shuffle(meetups);
    this.hasChanged();
  }

  /**
   * Get the next meetup.
   *
   * @method getNextMeetup
   * @return {Object} Next meetup object
   */
  getNextMeetup() {
    const meetup = this.getCurrentMeetup();
    this.count++;
    return meetup;
  }
 
  /**
   * Get current meetup.
   *
   * @method getCurrentMeetup
   * @return {Object} Current meetup object
   */
  getCurrentMeetup() {
    return this.state.meetups[ this.count ];
  }
}

export default MeetupStore;
