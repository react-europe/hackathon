var classnames = require('classnames');
var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Range',

    propTypes: {
        initialValue: React.PropTypes.number,
        minValue: React.PropTypes.number,
        maxValue: React.PropTypes.number,
    },

    getDefaultProps: function () {
        return {
            initialValue: 0,
            minValue: 0,
            maxValue: 100,
        };
    },

    getInitialState: function() {
        return {value: this.props.initialValue};
    },

    handleChange: function() {
        this.setState({value: event.target.value});
    },

    // TODO styling:
    // http://ionicframework.com/docs/components/#range
    // http://brennaobrien.com/blog/2014/05/style-input-type-range-in-every-browser.html
    render: function () {

        var outerClassName = classnames('Range-input', this.props.className,
            this.props.position, this.props.startIcon, {
        });

        var innerClassName = classnames(this.props.endIcon);

        return <div className={outerClassName}>

               <input
                    type="range" onChange={this.handleChange}
                    value={this.state.value}
                    min={this.props.minValue} max={this.props.maxValue} />

                <span className={innerClassName} />
        </div>;
    },
});
