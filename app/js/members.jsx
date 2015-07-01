"use strict";

var React = require("react");
var Http = require("./http");
var config = require("./config");

module.exports = React.createClass({
  displayName: 'App',

  propTypes: {
    groupId: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {};
  },


  componentDidMount() {
    Http.get(config.meetup.membersUrl, { "group_id": this.props.groupId }, response => {

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
          <div className="member" key={i}>
            <span className="city">{c.city}</span>
            <span className="total">{c.total}</span>
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
