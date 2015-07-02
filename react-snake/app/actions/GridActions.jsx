/**
 * Grid Action Creator
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

import GridConstants from '../constants/GridConstants';
import Marty from 'marty';

/**
 * This class defines the grid actions.
 *
 * @class GridActions
 */
class GridActions extends Marty.ActionCreators {

  /**
   * Move handler.
   *
   * @method move
   */
  move() {
    this.dispatch(GridConstants.MOVE);
  }

  /**
   * Move handler.
   *
   * @method move
   * @param {String} direction Direction
   */
  setDirection(direction) {
    this.dispatch(GridConstants.DIRECTION, direction);
  }

  /**
   * Move handler.
   *
   * @method move
   */
  addMeetup() {
    this.dispatch(GridConstants.ADD_MEETUP);
  }

  /**
   * Hit handler.
   *
   * @method hit
   * @param {Object} meetup Meetup data
   */
  hit(meetup) {
    this.dispatch(GridConstants.HIT, meetup);
  }
}

module.exports = GridActions;
