var React = require('react'),
  SetClass = require('classnames'),
  Tappable = require('react-tappable'),
  Navigation = require('touchstonejs').Navigation,
  Link = require('touchstonejs').Link,
  UI = require('touchstonejs').UI;

var People = require('../../../data/people');

var SimpleListItem = React.createClass({
  mixins: [Navigation],

  render: function () {
    var itemColorStyles = {
      color: this.props.contrast,
      backgroundColor: this.props.rgbcss,
      position: 'absolute',
      width: '100%',
      height: '100%',
      marginLeft: '-15px'
    };
    var linkItem = (<Link to="details" viewTransition="show-from-right" params={{ user: this.props.user, prevView: 'component-simple-list' }} className="list-item is-tappable" component="div"><div style={itemColorStyles}></div>
      <div className="item-inner">
        <div className="item-title">{[this.props.user.name.first, this.props.user.name.last].join(' ')}</div>
      </div>
    </Link>);
    // console.log(linkItem);
    // linkItem.style = itemColorStyles;
    return (
      linkItem
    );
  }
});

var SimpleList = React.createClass({
  randomIntensity: function() {
    return Math.round(Math.random()*256);
  },
  randomRGB: function () {
     return {
      r: this.randomIntensity(),
      g: this.randomIntensity(),
      b: this.randomIntensity()
    } 
  },
  returnRGBcss: function (rgb) {
    return "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
  },
  returnContrast: function (rgb) {
    return ((rgb.r*0.3 + rgb.g*0.6 + rgb.b*0.1) / 256 < 0.5)? "white" : "black";
  },
  render: function () {

    var users = [];
    var rgb, rgbcss, contrast;
    var self = this;
    
    this.props.users.forEach(function (user, i) {
      
      rgb = self.randomRGB();
      rgbcss = self.returnRGBcss(rgb);
      contrast = self.returnContrast(rgb);
      
      user.key = 'user-' + i;
      users.push(React.createElement(SimpleListItem, { user: user, rgbcss: rgbcss, contrast: contrast }));
    });
    
    return (
      <div>
        <div className="panel panel--first">
          {users}
        </div>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [Navigation],

  render: function () {

    return (
      <UI.View>
        <UI.Headerbar type="default" label="Simple List">
          <UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
        </UI.Headerbar>
        <UI.ViewContent grow scrollable>
          <SimpleList users={People} />
        </UI.ViewContent>
      </UI.View>
    );
  }
});
