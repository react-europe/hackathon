"use strict";

var React = require("react");

var Result = React.createClass({

  displayName: "Result",

  propTypes: {
    data: React.PropTypes.object.isRequired,
    resultSelected: React.PropTypes.func
  },

  onClick() {
    var callback = this.props.resultSelected;
    callback && callback(this.props.data);
  },

  render() {
    var data = this.props.data;
    return (
      <div className="result" onClick={this.onClick}>
        <div className="thumb">
          <img src={data.getIn(['photos', 0, 'thumb_link'])}/>
        </div>
        <div className="details">
          <div className="name">{data.get("name")}</div>
          <div className="location">
            <span className="city">{data.get("city")}</span>
            <span className="country">{data.get("country")}</span>
          </div>
        </div>
      </div>
    );
  }
});

var ResultList = React.createClass({

  displayName: "ResultList",

  propTypes: {
    data: React.PropTypes.object.isRequired,
    resultSelected: React.PropTypes.func
  },


  render() {
    if (this.props.data) {
      var results = this.props.data.map(
        (result, index) => <Result data={result} key={index}
                                   resultSelected={this.props.resultSelected}/>
      );
    }

    return (
      <div className="results">
        {results}
      </div>
    );
  }
});

module.exports = ResultList;
