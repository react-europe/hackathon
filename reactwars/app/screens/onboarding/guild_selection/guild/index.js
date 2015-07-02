'use strict';

var React = require('react-native');
var styles = require('./styles');

var {
  Text,
  Image,
  View,
  TouchableHighlight
} = React;

class Guild extends React.Component {
  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.1}
        underlayColor="#ffd8d6"
        style={styles.container}
        onPress={this.props.onChoose}>
        <View style={styles.inner}>
          { !!this.props.params.group_photo ?
            <Image source={{uri: this.props.params.group_photo.photo_link}} style={styles.pic} />
          : <View style={styles.no_pic} /> }

          <Text style={styles.name}>
            {this.props.params.name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = Guild;

