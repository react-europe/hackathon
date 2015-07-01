var React = require('react/addons'),
    classnames = require('classnames');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
    displayName: 'ItemMedia',
    propTypes: {
        avatar: React.PropTypes.string,
        avatarInitials: React.PropTypes.string,
        className: React.PropTypes.string,
    },

    render: function () {
        var className = classnames({
            'item-media': true,
            'is-avatar': this.props.avatar || this.props.avatarInitials,
        }, this.props.className);


        var avatar = this.props.avatar || this.props.avatarInitials ? (
            <div key={this.props.avatar} className={classnames("item-avatar2", 'flipper')}>
                {this.props.avatar ? <img src={this.props.avatar} /> : this.props.avatarInitials}
            </div>
        ) : null;


        return (
            <ReactCSSTransitionGroup className={className} transitionAppear={false} transitionName="flip">
                {avatar}
            </ReactCSSTransitionGroup>
        );
    },
});
