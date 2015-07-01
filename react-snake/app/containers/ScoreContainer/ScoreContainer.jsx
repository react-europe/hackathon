/**
 * Score Container.
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
import Score from '../../components/Score/Score';

export default Marty.createContainer(Score, {
  
  listenTo: 'gridStore',
  
  fetch: {
    hit() {
      return this.app.gridStore.getHit();
    }
  }
});
