/**
 * Controls Component.
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
import _ from 'lodash';
import './Controls.scss';

/**
 * This class defines the Controls component.
 *
 * @class Grid
 */
class Controls extends React.Component {
  
  /**
   * Render method.
   *
   * @method render
   * @return Markup for the component
   */
  render() {
    return (
      <div className="controls">
        <button className="left" onClick={this.left.bind(this)}>&#9668;</button>
        <button className="up" onClick={this.up.bind(this)}>&#9650;</button>
        <button className="down" onClick={this.down.bind(this)}>&#9660;</button>
        <button className="right" onClick={this.right.bind(this)}>&#9658;</button>
      </div>
    );
  }

  /**
   * Left move method.
   *
   * @method left
   */
  left() {
    this.props.app.gridActions.setDirection('left');
  }
  
  /**
   * Up move method.
   *
   * @method up
   */
  up() {
    this.props.app.gridActions.setDirection('up');
  }
  
  /**
   * Down move method.
   *
   * @method down
   */
  down() {
    this.props.app.gridActions.setDirection('down'); 
  }
  
  /**
   * Right move method.
   *
   * @method right
   */
  right() {
    this.props.app.gridActions.setDirection('right');
  }
  
}

export default Controls;