var React = require('react'),
    Dialogs = require('touchstonejs').Dialogs,
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI;

var Timers = require('react-timers');


// TODO SpeakerListItem can be factored into a shared component
var SpeakerListItem = React.createClass({
    mixins: [Navigation],

    render: function () {

        var initials = this.props.speaker.firstName.charAt(0).toUpperCase() +
            this.props.speaker.lastName.charAt(0).toUpperCase();

        return (
            <Link viewTransition="show-from-right" to="speaker-details"
                    params={{
                        prevView: 'event-details',
                        prevViewProps: {event: this.props.event},
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

var SpeakerList = React.createClass({
    propTypes: {
        speakers: React.PropTypes.array.isRequired,
    },

    render: function () {
        var that = this;

        var speakers = [];

        this.props.speakers.forEach(function (speaker, i) {
            var key = 'speaker-' + i;
            speakers.push(React.createElement(SpeakerListItem, {
                key: key, event: that.props.event, speaker: speaker }));
        });

        return (
            <div>
                <div className="panel avatar-list">
                    {speakers}
                </div>
            </div>
        );
    },
});


module.exports = React.createClass({
    mixins: [Navigation, Dialogs, Timers()],

    propTypes: {
        prevView: React.PropTypes.string,
        event: React.PropTypes.object.isRequired,
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

        return (
            <UI.View>
                <UI.Headerbar type="default"
                    label={this.props.event.shortTitle || this.props.event.title}>
                    <UI.HeaderbarButton showView={this.props.prevView}
                        viewTransition="reveal-from-right"
                        label="Back" icon="ion-chevron-left" />
                </UI.Headerbar>
                <UI.ViewContent grow scrollable>
                    <div className="panel-header text-caps">Speakers</div>

                    {this.props.event.speakers ? <SpeakerList event={this.props.event} speakers={this.props.event.speakers}/>
                        : null}

                    <div className="panel-header text-caps">Details</div>
                    <div className="panel">
                        <div style={{fontWeight: 'bold', paddingTop: '5px'}} className="list-item">
                            {this.props.event.title}
                        </div>
                        <div className="list-item">
                            <div className="item-inner">
                            {this.props.event.description}
                            </div>
                        </div>
                    </div>
                    <div className="panel">

                    </div>

                </UI.ViewContent>
                <UI.Footerbar type="default">
                    <UI.FooterbarButton showView="start"
                        viewTransition="fade" label="Now"
                        icon="ion-flash" />
                    <UI.FooterbarButton active label="Programme"
                        icon="ion-mic-a" />
                    <UI.FooterbarButton label="Buzz"
                        icon="ion-ios7-pulse-strong" />
                    <UI.FooterbarButton label="Explore"
                        icon="ion-compass" />
                </UI.Footerbar>
            </UI.View>
        );
    },
});
