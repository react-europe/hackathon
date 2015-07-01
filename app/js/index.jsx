"use strict";

var React = require("react");
var App = require("./app");

React.initializeTouchEvents(true);

React.render(
  <App />,
  document.getElementById("app")
);
