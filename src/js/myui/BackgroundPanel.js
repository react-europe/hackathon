var classnames = require('classnames');
var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'BackgroundPanel',

    propTypes: {
        backgroundSize: React.PropTypes.oneOf(['contain', 'auto']),
        backgroundRepeat: React.PropTypes.oneOf(['no-repeat']),
        backgroundPosition: React.PropTypes.string,
        backgroundImage: React.PropTypes.string.isRequired,
        opacity: React.PropTypes.number,
    },

    getDefaultProps: function () {
        return {
            backgroundSize: 'auto',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: "50% 50%",
            opacity: 1,
        };
    },

    render: function () {
        // would normally use a ::before pseudo element
        // http://stackoverflow.com/a/13509036
        // 'react way' described here:
        // http://stackoverflow.com/a/28269950
        var before = <span style={{
                    content: "",
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    backgroundImage: this.props.backgroundImage,
                    opacity: this.props.opacity,
                    backgroundPosition: this.props.backgroundPosition,
                    backgroundSize: this.props.backgroundSize,
                    backgroundRepeat: this.props.backgroundRepeat,
        }}/>;

        return <div style={{
                            width: "100%",
                            minHeight: "auto",
                            height: "auto",
                            }}>
                {before}

                {this.props.children}
        </div>;
    },
});
