var classnames = require('classnames');
var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Range',


    getDefaultProps: function () {
        return {

        };
    },
    getInitialState: function() {
        return {value: 0};
    },

    handleChange: function() {
        this.setState({value: event.target.value});
    },

    render: function () {

        var outerClassName = classnames('Range-input', this.props.className,
            this.props.position, this.props.startIcon, {
        });

        var innerClassName = classnames(this.props.endIcon)

        return <div className={outerClassName}>

               <input
                     type="range" onChange={this.handleChange}
                    value={this.state.value}
                     min="0" max="100" />

                <span className={innerClassName} />
        </div>
    }
});
