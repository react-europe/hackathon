/**
 * Game component.
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
import GridContainer from '../../containers/GridContainer/GridContainer';
import './Game.scss';
import ScoreContainer from '../../containers/ScoreContainer/ScoreContainer';

/**
 * This class defines the Game component.
 *
 * @class Game
 */
class Game extends React.Component {

  /**
   * Render method.
   *
   * @method render
   * @return Markup for the component
   */
  render() {
    return (
      <div className="game">
        <GridContainer />
        <ScoreContainer />
      </div>
    );
  }
}

export default Game;
