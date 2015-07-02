/**
 * Splash Screen styles
 */

var React = require('react-native');
var Device = require('react-native-device');

var styles = React.StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column'
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    width: Device.width,
    resizeMode: 'stretch',
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  }
});

module.exports = styles;
