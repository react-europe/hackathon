/**
 * Main App wrapper
 * Display when app starts or resumes
 * when trying to determine the state of things
 */

'use strict';
var React = require('react-native');
var AppStore = require('../../stores/app.js');
var SplashScreen = require('../splash');
var OnboardingScreen = require('../onboarding');
var AppActionCreator = require('../../action_creators/app.js');
var Game = require('../game');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.stateFromStores();
  }

  stateFromStores() {
    return {
      initialized: AppStore.state.get('initialized'),
      logged_in: AppStore.state.get('logged_in'),
      onboarded: AppStore.state.get('onboarded')
    }
  }

  componentDidMount() {
    AppStore.changed.add(this.appChanged.bind(this));
    AppActionCreator.init()
  }

  componentWillUnmount() {
    AppStore.changed.remove(this.appChanged.bind(this));
  }

  appChanged() {
    this.setState(this.stateFromStores());
  }

  render() {
    if (this.state.logged_in && this.state.initialized) {
      if (this.state.onboarded) {
        return <Game />
      } else {
        return <OnboardingScreen />
      }
    } else {
      return (
        <SplashScreen />
      )
    }
  }
}

module.exports = App;
