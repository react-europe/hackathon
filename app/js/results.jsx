"use strict";

var React = require("react");

module.exports = React.createClass({

  displayName: "Results",

  propTypes: {
    data: React.PropTypes.object.isRequired
  },


  render() {
    if (this.props.data) {
      var results = this.props.data.map((result, index) => {
        return (
          <div className="result" key={index}>
            <div className="thumb">
              <img src={result.getIn(['photos', 0, 'thumb_link'])} />
            </div>
            <div className="details">
              <div className="name">{result.get("name")}</div>
              <div className="location">
                <span className="city">{result.get("city")}</span>
                <span className="country">{result.get("country")}</span>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="results">
        {results}
      </div>
    );
  }
});
