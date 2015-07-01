/**
 * Grid Container.
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
import Grid from '../../components/Grid/Grid';

export default Marty.createContainer(Grid, {
  listenTo: 'gridStore',
  componentDidMount() {
    this.app.meetupsQueries.getMeetups();
    
    window.setInterval(function () {
      this.app.gridActions.move();
    }.bind(this), 200);

    this.app.gridActions.addMeetup();

    window.addEventListener('keydown', function(event) {
      switch(event.keyCode) {
      case 39:
        this.app.gridActions.setDirection('right');
        break;
      case 40:
        this.app.gridActions.setDirection('down');
        break;
      case 38:
        this.app.gridActions.setDirection('up');
        break;
      case 37:
        this.app.gridActions.setDirection('left');
        break;
      }
    }.bind(this));
  },
  fetch: {
    snake() {
      return this.app.gridStore.getSnake();
    },
    meetups() {
      return this.app.gridStore.getMeetups();
    },
    gameover() {
      return this.app.gridStore.getGameOver();
    },
    won() {
      return this.app.gridStore.getWon();
    }
  }
});
