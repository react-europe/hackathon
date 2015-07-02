/*global __DEV__ __CORDOVA__ StatusBar*/

require('whatwg-fetch');
require('intl');
const React = require('react');
const App = require('./App');

function render() {
  React.render(<App />, document.getElementById('container'));
}

function onDeviceReady() {
  StatusBar.hide();
  render();
}

if (__CORDOVA__) {
  document.addEventListener('deviceready', onDeviceReady, false);
} else {
  render();
}
