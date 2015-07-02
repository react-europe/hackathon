'use strict';
var React = require('react-native');
var AppStore = require('../../stores/app.js');

var styles = require('./styles');

var {
  Text,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class GameScreen extends React.Component {
  render() {
    var guildColor = AppStore.state.get('user').guild_color;
    return (
      <View style={styles.main_container}>
        <Image source={require('image!big_game')} style={[styles.background, {backgroundColor: guildColor}]} />
      </View>
    );
  }
}

module.exports = GameScreen;

