/**
 * Guild Selection
 */

var React = require('react-native');
var Device = require('react-native-device');

var styles = React.StyleSheet.create({
  container: {
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },

  inner: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },

  pic: {
    height: 80,
    width: 80,
    borderRadius: 10
  },

  no_pic: {
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundColor: '#ccc'
  },

  name: {
    fontFamily: 'Helvetica Neue',
    color: 'black',
    fontWeight: '300',
    paddingTop: 25,
    paddingLeft: 20,
    fontSize: 23
  }
});

module.exports = styles;
