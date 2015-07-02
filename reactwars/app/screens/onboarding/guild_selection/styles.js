/**
 * Onboarding Screen styles
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
  },

  header: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    height: 100
  },

  list: {
    flex: 1
  }


});

module.exports = styles;

