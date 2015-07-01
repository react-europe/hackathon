"use strict";

var React = require("react");
var Http = require("./http");

var Search = require("./search");
var ResultList = require("./results");
var Map = require("./map");
var Members = require("./members");

module.exports = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {};
  },

  updateResults(results) {
    this.setState({ results: results });
  },

  resultSelected(result) {
    this.setState({
      showResult: true,
      result: result
    });
  },

  render() {
    var comp;
    if (this.state.showResult) {
      comp = (
        <div>
          <Map data={this.state.result} />
          <Members groupId={this.state.result.get("id", 0)} />
        </div>
      );

    } else if (this.state.results) {

      comp = <ResultList data={this.state.results}
                         resultSelected={this.resultSelected}/>;
    }

    return (
      <div className="main">
        <div className="head">ReactJS Meetups</div>
        <Search onSearchResultsReceived={this.updateResults}/>
        {comp}
      </div>
    );
  }
});
