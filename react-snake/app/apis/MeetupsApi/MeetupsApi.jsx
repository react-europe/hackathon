/**
 * Meetups api
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
import data from  '../../../data.json';

/**
 * This class defines the meetup api.
 *
 * @class MeetupsApi
 */
class MeetupsApi extends Marty.HttpStateSource {
  getMeetups() {
    return data;
  }
}

export default MeetupsApi;
