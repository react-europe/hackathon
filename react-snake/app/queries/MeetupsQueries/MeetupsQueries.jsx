/**
 * Meetups Queries.
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

import Marty from 'marty';

import MeetupsConstants from '../../constants/MeetupsConstants';

/**
 * This class defines the Meetups Queries.
 *
 * @class MeetupsQueries
 */
class MeetupsQueries extends Marty.Queries {

  /**
   * Get meetups.
   *
   * @method getMeetups
   */
  getMeetups() {
    this.dispatch(MeetupsConstants.MEETUPS, this.app.meetupsApi.getMeetups());
  }
}

export default MeetupsQueries;