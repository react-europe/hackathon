var React = require('react'),
    SetClass = require('classnames'),
    Tappable = require('react-tappable'),
    Navigation = require('touchstonejs').Navigation,
    Link = require('touchstonejs').Link,
    UI = require('touchstonejs').UI;

var Events = require('../../data/programme');

console.log(Events);

var ComplexListItem = React.createClass({
    mixins: [Navigation],

    render: function () {

        var speakers = this.props.event.speakers,
            speaker = speakers && speakers.length > 0 ? speakers[0] : undefined,
            firstName = speaker ? speaker.firstName : '',
            lastName = speaker ? speaker.lastName : '',
            date = new Date(this.props.event.time),
            time = date.getHours() + ":" + date.getMinutes(),
            initials = firstName.charAt(0).toUpperCase() +
            lastName.charAt(0).toUpperCase();

        return (
            <Link viewTransition="show-from-right"
                className="list-item" component="div">
                <UI.ItemMedia avatar={
                    speaker ?
                        this.props.event.speakers[0].pic : "img/reacteurope.png"}
                    avatarInitials={initials} />
                <div className="item-inner">
                    <div className="item-content">
                        <div className="item-title">{this.props.event.title}</div>
                        <div className="item-subtitle">
                            {[firstName, lastName].join(' ')}
                        </div>
                    </div>
                    <UI.ItemNote type="default"
                        label={time}
                        icon="ion-chevron-right" />
                </div>
            </Link>
        );
    }
});

var ComplexList = React.createClass({
    render: function () {

        var events = [];
        console.log(this.props.events)

        this.props.events.forEach(function (event, i) {
            event.key = 'event-' + i;
            events.push(React.createElement(ComplexListItem, { event: event }));
        });

        return (
            <div>
                <div className="panel panel--first avatar-list">
                    {events}
                </div>
            </div>
        );
    }
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
    }
});
