/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Flux = require('./app/lib/flux');
var App = require('./app/screens/app');
require('./app/stores');
require('./app/action_creators');

Flux.start();
React.AppRegistry.registerComponent('reactwars', () => App);

