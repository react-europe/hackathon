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

    getInitialState: function() {
        return {
            flipped: false,
        };
    },

    componentDidMount: function() {
        var self = this,
            ordinal = this.props.index && this.props.index + 1,
            multiplier = (ordinal || 1),
            delay = 1500 + multiplier * 500;

        var toggle = function() {
            var flipped = self.state.flipped;

            self.setState({flipped: !flipped});
        };

        this.timer = setInterval(toggle, delay);
    },

    componentWillUnmount: function() {
        clearInterval(this.timer);
    },

    render: function () {
        var className = classnames('flip-container', {
            'item-media': true,
            'is-icon': this.props.icon,
            'is-avatar': this.props.avatar || this.props.avatarInitials,
            'is-thumbnail': this.props.thumbnail,
            'flipped': this.state.flipped,
        }, this.props.className);

        // media types
        var icon = this.props.icon ? (
            <div className={'item-icon ' + this.props.icon} />
        ) : null;

        var avatar = this.props.avatar || this.props.avatarInitials ? (

                <div className={classnames("item-avatar2", 'flipper')}>
                    {this.props.avatar ?
                    <img className="front" src={this.props.avatar} /> :
                        <div style={{
                            backgroundColor: 'orange', borderRadius: '50%'}}
                            className='front'>{this.props.avatarInitials}</div>}

                    {true ?
                    <img className="back" src='img/reacteurope.png' /> :

                        <div style={{backgroundColor: 'grey', borderRadius: '50%'}}
                        className='back'>FW</div> }
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
