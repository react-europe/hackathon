var React = require('react'),
    classnames = require('classnames'),
    Tappable = require('react-tappable'),
    Dialogs = require('touchstonejs').Dialogs,
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI;

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

                    {this.props.event.speakers ? <SpeakerList speakers={this.props.event.speakers}/>
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
