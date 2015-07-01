"use strict";

var React = require("react");
var Http = require("./http");

var Search = require("./search");
var Results = require("./results");
var Members = require("./members");

module.exports = React.createClass({
  displayName: 'App',

  getInitialState() {
    return { };
  },

  updateResults(results) {
    this.setState({ results: results });
  },

  render() {
    var resultsComponent;
    if (this.state.results) {
      resultsComponent = <Results data={this.state.results} />;
    }

    return (
      <div className="main">
        <div className="head">ReactJS Meetups</div>
        <Search onSearchResultsReceived={this.updateResults}/>
        {resultsComponent}
      </div>
    );
  }
});
