"use strict";

var React = require("react");
var Http = require("./http");
var config = require("./config");

module.exports = React.createClass({
  displayName: 'App',

  propTypes: {
    cities: React.PropTypes.func
  },

  getInitialState() {
    return {};
  },


  componentDidMount() {
    Http.get(config.meetup.membersUrl, {"group_id": "13980992"}, response => {

      this.setState({
        cities: response
          .get('results')
          .groupBy((member) => member.get('city'))
          .map((m, c) => {
            return {
              city: c,
              total: m.count()
            }
          })
      })
    })
  },

  render(){
    var cities = this.state.cities;
    if (cities) {
      var stats = cities.map((c, i) =>
          <div key={i}>
            <span>{c.city}</span>
            <span>{c.lon}</span>
            <span>{c.lat}</span>
            <span> {c.total}</span>
          </div>
      );
    }

    return (
      <div className="members">
        {stats}
      </div>
    );
  }
});
