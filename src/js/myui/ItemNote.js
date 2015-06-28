var React = require('react/addons'),
    classnames = require('classnames');

module.exports = React.createClass({
    displayName: 'ItemNote',
    propTypes: {
        className: React.PropTypes.string,
        icon: React.PropTypes.string,
        label: React.PropTypes.string,
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

        return (
            <div className={className}>

                {this.props.children}
            </div>
        );
    }
});
