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
  },
  header: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: 232,
    height: 42,
    marginTop: 50
  },

  loader: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 15
  },

  joinButton: {
    alignSelf: 'center',
    width: 200,
    height: 60,
    borderRadius: 4,
    padding: 18,
    backgroundColor: 'rgba(129,31,31,0.8)',
    marginBottom: 40
  },
  joinButtonText: {
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 20,
    color: 'white'
  }
});

module.exports = styles;
