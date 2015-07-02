/**
 * Splash Screen
 * Display when app starts or resumes
 * when trying to determine the state of things
 */

'use strict';
var React = require('react-native');
var AppStore = require('../../stores/app.js');
var MeetupOauthActionCreator = require('../../action_creators/meetup_oauth.js');
var styles = require('./styles');

var {
  Text,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      initialized: AppStore.state.get('initialized')
    }
  }

  _handleJoin() {
    if (this.state.loading === true) { return; }
    MeetupOauthActionCreator.requestAccess();
    this.setState({loading: true});
  }

  componentDidMount() {
    AppStore.changed.add(this.appChanged.bind(this));
  }

  componentWillUnmount() {
    AppStore.changed.remove(this.appChanged.bind(this));
  }

  appChanged() {
    this.setState({
      initialized: AppStore.state.get('initialized')
    });
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Image source={require('image!splash_bg')} style={styles.background}>
          <Image source={require('image!header')} style={styles.header} />

          <ActivityIndicatorIOS
            animating={this.state.loading}
            style={styles.loader}
            size="large"
            color="#ffffff"
          />

          { this.state.initialized ?
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="#811f1f"
              style={styles.joinButton}
              onPress={this._handleJoin.bind(this)}>
              <Text style={styles.joinButtonText}>
                Join the fight!
              </Text>
            </TouchableHighlight>
          : null }
        </Image>
      </View>
    );
  }
}


module.exports = SplashScreen;

