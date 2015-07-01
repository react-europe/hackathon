/**
 * Onboarding Flow
 */

'use strict';
var React = require('react-native');
var styles = require('./styles');
var GuildSelection = require('./guild_selection');

var {
  Text,
  Navigator,
  View
} = React;

class OnboardingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGuild(navigator) {
    return <GuildSelection navigator={navigator} />
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'guild', index: 0}}
        renderScene={(route, navigator) => {
          if (route.name == 'guild') {
            return this.renderGuild(navigator);
          } else if (route.name == 'character') {
            return this.renderCharacter(navigator);
          }
        }}
      />
    );
  }
}

module.exports = OnboardingScreen;
