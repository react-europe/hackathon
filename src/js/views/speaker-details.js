var React = require('react'),
    Dialogs = require('touchstonejs').Dialogs,
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI;


// TODO SpeakerListItem can be factored into a shared component
var SpeakerListItem = React.createClass({
    mixins: [Navigation],

    render: function () {

        var initials = this.props.speaker.firstName.charAt(0).toUpperCase() +
            this.props.speaker.lastName.charAt(0).toUpperCase();

        return (
            <Link viewTransition="show-from-right" to="speaker-details"
                    params={{
                        speaker: this.props.speaker,
                    }}
                 className="list-item" component="div">
                <UI.ItemMedia avatar={this.props.speaker.pic}
                    avatarInitials={initials} />
                <div className="item-inner">
                    <div className="item-content">
                        <div className="item-title">{[
                            this.props.speaker.firstName,
                            this.props.speaker.lastName].join(' ')}</div>
                        {/*<div className="item-subtitle">
                            // not sure if we need this
                        </div> */}
                    </div>
                </div>
            </Link>
        );
    },
});

var Timers = require('react-timers');

module.exports = React.createClass({
    mixins: [Navigation, Dialogs, Timers()],

    propTypes: {
        prevView: React.PropTypes.string,
        speaker: React.PropTypes.object.isRequired,
    },

    getDefaultProps: function () {
        return {
            prevView: 'start',
        };
    },

    getInitialState: function () {
        return {

        };
    },

    render: function () {
        console.log('prevViewProps: ' + this.props.prevViewProps);
        var speaker = this.props.speaker;

        return (
            <UI.View>
                <UI.Headerbar type="default"
                    label={[speaker.firstName, speaker.lastName].join(' ')}>
                    <UI.HeaderbarButton showView={this.props.prevView}
                        viewProps={this.props.prevViewProps}
                        viewTransition="reveal-from-right"
                        label="Back" icon="ion-chevron-left" />
                </UI.Headerbar>
                <UI.ViewContent grow scrollable>
                    <div className="panel-header text-caps">Speaker</div>


                    <SpeakerListItem speaker={speaker} />

                    <div className="panel-header text-caps">Details</div>
                    <div className="panel">

                    </div>
                    <div className="panel">

                    </div>

                </UI.ViewContent>
                {/*<UI.Footerbar type="default">
                    <UI.FooterbarButton showView="start"
                        viewTransition="fade" label="Now"
                        icon="ion-flash" />
                    <UI.FooterbarButton active label="Programme"
                        icon="ion-mic-a" />
                    <UI.FooterbarButton label="Buzz"
                        icon="ion-ios7-pulse-strong" />
                    <UI.FooterbarButton label="Explore"
                        icon="ion-compass" />
                </UI.Footerbar>*/}
            </UI.View>
        );
    },
});
