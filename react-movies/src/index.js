import React from 'react';

import App from './App';

// if (__DEV__ && __CORDOVA__) {
//   // Wait until we've opened our debugger
//   alert('Ready?');
// }

if (__DEV__) {
  let warn = console.warn;
  // Have warnings cause errors
  console.warn = function(warning) {
    throw new Error(warning);
  };
}

function render() {
  React.render(<App />, document.getElementById('container'));
}

function onDeviceReady() {
  StatusBar.styleDefault();
  render();
}

if (__CORDOVA__) {
  document.addEventListener('deviceready', onDeviceReady, false);
} else {
  render();
}