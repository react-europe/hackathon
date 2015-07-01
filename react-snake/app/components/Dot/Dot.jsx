import React from 'react';
import './Dot.scss';

/**
 * This class defines the dot component.
 *
 * @class Dot
 */
class Dot extends React.Component {
  
  /**
  * Render method.
  *
  * @method render
  * @return Markup for the component
  */
  render() {
    return (
      <div className={ 'dot ' + this.props.className }>
      </div>
    );
  }
}

export default Dot;
