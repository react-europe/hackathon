var React = require('react'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI;

var People = require('../../../data/people');

var ComplexListItem = React.createClass({
	mixins: [Navigation],

	render: function () {

		var initials = this.props.offer.name.first.charAt(0).toUpperCase();

		return (
			<Link to="details" viewTransition="show-from-right" params={{ user: this.props.offer, prevView: 'component-complex-list' }} className="list-item" component="div">
				<UI.ItemMedia avatar={this.props.offer.img} avatarInitials={initials} />
				<div className="item-inner">
					<div className="item-content">
						<div className="item-title">{this.props.offer.name}</div>
						<div className="item-subtitle">{this.props.offer.location}</div>
					</div>
					<UI.ItemNote type="default" label="from 23 €" icon="ion-chevron-right" />
				</div>
			</Link>
		);
	}
});

var ComplexList = React.createClass({
	render: function () {

		var offers = [];

		this.props.offers.forEach(function (offer, i) {
			offer.key = 'offer-' + i;
			offers.push(React.createElement(ComplexListItem, { offer: offer }));
		});

		return (
			<div>
				<div className="panel panel--first avatar-list">
					{offers}
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
				<UI.Headerbar type="default" label="Complex List">
					<UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
					<ComplexList offers={People} />
				</UI.ViewContent>
			</UI.View>
		);
	}
});
