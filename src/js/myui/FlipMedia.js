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
        var className = classnames('flip-container', {
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

                <div className={classnames("item-avatar2", 'flipper')}>
                    {this.props.avatar ?
                    <img className="front" src={this.props.avatar} /> :
                        <div style={{backgroundColor: 'orange', borderRadius: '50%'}} className='front'>{this.props.avatarInitials}</div>}

                    {true ?
                    <img className="back" src='img/reacteurope.png' /> :
                        <div style={{backgroundColor: 'grey', borderRadius: '50%'}} className='back'>FW</div> }
                </div>

        ) : null;
        var thumbnail = this.props.thumbnail ? (
            <div className="item-thumbnail">
                <img src={this.props.thumbnail} />
            </div>
        ) : null;

        return (
            <div style={{backgound: 'none'}} className={className}>
                {icon}
                {avatar}
                {thumbnail}

            </div>
        );
    },
});
