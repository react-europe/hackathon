var React = require('react/addons'),
    classnames = require('classnames');

module.exports = React.createClass({
    displayName: 'FlipMedia2',
    propTypes: {
        avatar: React.PropTypes.string,
        className: React.PropTypes.string,
    },

    getInitialState: function() {
        return {
            oldAvatar: this.props.avatar,
            flipped: false,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var self = this;
        var flipped = this.state.flipped;

        if (nextProps.avatar !== this.state.avatar) {
            self.setState({flipped: !flipped});
        }
    },

    componentDidMount: function() {

    },

    componentWillUnmount: function() {
        // clearInterval(this.timer);
    },

    render: function () {
        var flipped = this.state.flipped;
        var className = classnames('flip-container', {
            'item-media': true,
            'is-avatar': this.props.avatar || this.props.avatarInitials,
            'flipped': this.state.flipped,
        }, this.props.className);

        var front = <img className="front"
            src={!flipped ? this.props.avatar : this.props.oldAvatar} />;

        var back = <img className="back"
            src={flipped ? this.props.avatar : this.props.oldAvatar} />;

        var flipper =
            <div className={classnames("item-avatar2", 'flipper')}>
                {front}
                {back}
            </div>;

        return (
            <div style={{backgound: 'none'}} className={className}>

                {flipper}

            </div>
        );
    },
});