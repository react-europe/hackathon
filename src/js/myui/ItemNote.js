var React = require('react/addons'),
    classnames = require('classnames');


// A version of ItemNote that lets you set children instead of a label
module.exports = React.createClass({
    displayName: 'ItemNote',
    propTypes: {
        className: React.PropTypes.string,
        icon: React.PropTypes.string,
        type: React.PropTypes.string
    },

    getDefaultProps () {
        return {
            type: 'default'
        };
    },

    render () {
        var className = classnames({
            'item-note': true
        }, this.props.type, this.props.className);

        var icon = this.props.icon ? (
            <div className={'item-note-icon ' + this.props.icon} />
        ) : null;

        return (
            <div className={className}>
                {this.props.children}
                {icon}
            </div>
        );
    }
});
