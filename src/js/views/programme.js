var React = require('react'),
    SetClass = require('classnames'),
    Tappable = require('react-tappable'),
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI,
    MUI = require('../myui');

var Events = require('../../data/programme');

var ComplexListItem = React.createClass({
    mixins: [Navigation],

    render: function () {

        var speakers = this.props.event.speakers,
            speaker = speakers && speakers.length > 0 ? speakers[0] : undefined,
            firstName = speaker ? speaker.firstName : '',
            lastName = speaker ? speaker.lastName : '',
            date = new Date(this.props.event.time),
            language = navigator.language || 'en-US',
            time = date.toLocaleTimeString(
                language, {hour: '2-digit', minute: '2-digit'}),
                    //http://stackoverflow.com/a/20430558
            initials = firstName.charAt(0).toUpperCase() +
                lastName.charAt(0).toUpperCase(),
            avatar = speaker ?
                        this.props.event.speakers[0].pic : "img/reacteurope.png";

        var maybeMedia = <MUI.FlipMedia avatar={avatar}
                    avatarInitials={initials}/>;

        return (
            <Link viewTransition="show-from-right"
                className="list-item" component="div">
                {maybeMedia}

                <div className="item-inner" style={{fontSize: "90%"}}>
                    <div style={{padding: "0 4px"}} className="item-content">
                        {this.props.event.title}

                    </div>
                    <MUI.ItemNote>
                        <div style={{textAlign: 'right'}}>
                        <div className="item-subtitle">{firstName}
                        </div>
                        <div className="item-subtitle">{lastName}</div>
                        <div style={{paddingTop: "2px"}} className="item-subtitle">{time}</div>
                        </div>
                    </MUI.ItemNote>
                    <UI.ItemNote icon="ion-chevron-right"/>
                </div>
            </Link>
        );
    },
});

var ComplexList = React.createClass({
    render: function () {
        var events = [];

        this.props.events.forEach(function (event, i) {
            var key = 'event-' + i;
            events.push(React.createElement(ComplexListItem, { index: i, key: key, event: event }));
        });

        return (
            <div>
                <div className="panel panel--first avatar-list">
                    {events}
                </div>
            </div>
        );
    },
});

module.exports = React.createClass({
    mixins: [Navigation],

    render: function () {

        return (
            <UI.View>
                <UI.Headerbar type="default" label="Programme">
                    <UI.HeaderbarButton showView="start"
                        viewTransition="reveal-from-right"
                        label="Back" icon="ion-chevron-left" />
                </UI.Headerbar>
                <UI.ViewContent grow scrollable>
                    <ComplexList events={Events} />
                </UI.ViewContent>
                <UI.Footerbar type="default">
                    <UI.FooterbarButton showView="start" viewTransition="show-from-right" label="Now" icon="ion-flash" />
                    <UI.FooterbarButton active label="Programme" icon="ion-mic-a" />
                    <UI.FooterbarButton label="Buzz" icon="ion-ios7-pulse-strong" />
                    <UI.FooterbarButton label="Explore" icon="ion-compass" />
                </UI.Footerbar>
            </UI.View>
        );
    },
});
