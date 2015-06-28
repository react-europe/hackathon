var React = require('react/addons'),
    classnames = require('classnames'),
    UI = require('touchstonejs').UI;

// http://davidwalsh.name/css-flip

var AvatarType = React.PropTypes.shape({
            avatar: React.PropTypes.string,
            avatarInitials: React.PropTypes.number,
        });


var Front = React.createClass({

    propTypes: {
        avatar: AvatarType.isRequired,
    },

    render: function () {
        var className = classnames('front', this.props.className);
        return (<div className={className} >
            <UI.ItemMedia avatar={this.props.avatar.avatar}
                avatarInitials={this.props.avatar.avatarInitials} />
        </div>);
    },
});


var Back = React.createClass({

    propTypes: {
        avatar: AvatarType.isRequired,
    },

    render: function () {
        var className = classnames('back', this.props.className);
        return (<div className={className} >
            <UI.ItemMedia avatar={this.props.avatar.avatar}
                avatarInitials={this.props.avatar.avatarInitials} />
        </div>);
    },
});


module.exports = React.createClass({
    displayName: 'FlipMedia',
    propTypes: {
        frontAvatar: AvatarType.isRequired,
        backAvatar: AvatarType,
    },

    render: function () {
        var className = classnames('flip-container', this.props.className);

        var front = <Front avatar={this.props.frontAvatar}/>;

        var back = this.props.backAvatar ?
            <Back avatar={this.props.backAvatar}/> : <Back avatar={this.props.frontAvatar}/>;

        return (
            <div className={className}>
                <div className="flipper">
                    {front}
                    {back}
                </div>
            </div>
        );
    },
});
