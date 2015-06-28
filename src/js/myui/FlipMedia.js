var React = require('react/addons'),
    classnames = require('classnames');

module.exports = React.createClass({
    displayName: 'ItemMedia',
    propTypes: {
        avatar: React.PropTypes.string,
        avatarInitials: React.PropTypes.string,
        className: React.PropTypes.string,
        icon: React.PropTypes.string,
        thumbnail: React.PropTypes.string,
    },

    render: function () {
        var className = classnames({
            'item-media': true,
            'is-icon': this.props.icon,
            'is-avatar': this.props.avatar || this.props.avatarInitials,
            'is-thumbnail': this.props.thumbnail,
        }, this.props.className);

        // media types
        var icon = this.props.icon ? (
            <div className={'item-icon ' + this.props.icon} />
        ) : null;
        var avatar = this.props.avatar || this.props.avatarInitials ? (
            <div className={classnames('flip-container')}>
                <div className={classnames("item-avatar", 'flipper')}> {this.props.avatar ?
                    <img className="front" src={this.props.avatar} /> :
                        this.props.avatarInitials}

                    {this.props.avatar ?
                    <img className="back" src={this.props.avatar} /> :
                        this.props.avatarInitials}
                </div>
            </div>
        ) : null;
        var thumbnail = this.props.thumbnail ? (
            <div className="item-thumbnail">
                <img src={this.props.thumbnail} />
            </div>
        ) : null;

        return (
            <div className={className}>
                {icon}
                {avatar}
                {thumbnail}
            </div>
        );
    },
});
