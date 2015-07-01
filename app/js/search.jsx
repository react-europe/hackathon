"use strict";

var React = require("react");
var Http = require("./http");
var config = require("./config");

module.exports = React.createClass({
  displayName: "Search",

  propTypes: {
    onSearchResultsReceived: React.PropTypes.func
  },

  handleSearchChange() {
    var value = React.findDOMNode(this.refs.search).value;
    if (value && value.length > 3) {
      Http.get(config.meetup.searchUrl, { "location": value }, response => {
        var callback = this.props.onSearchResultsReceived;

        callback && callback(response);
      });
    }
  },

  render() {
    return (
      <div className="search">
        <div className="keywords">Keywords:</div>
        <div className="inputs">
          <input className="search-input" type="text" ref="search"
                 onChange={this.handleSearchChange}/>
          <button className="button">Search</button>
        </div>
      </div>
    );
  }
});
