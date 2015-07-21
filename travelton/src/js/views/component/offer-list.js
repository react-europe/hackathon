var React = require('react'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI;

var Offers = require('../../../data/bestprice-products');

// DEPARTURE_DATE:"2015-07-12",
// 		RETURN_DATE:"2015-07-17",
// 		LENGTH_OF_STAY:5,
// 		DEPARTURE_AIRPORT_CODE:"FKB",
// 		DEPARTURE_AIRPORT_NAME:"Karlsruhe",
// 		HOTEL_CODE:3297,
// 		HOTEL_NAME:"Canyamel Classic",
// 		HOTEL_CATEGORY:4.0,
// 		HOTEL_LOCATION_COUNTRY:"Spanien",
// 		HOTEL_LOCATION_REGION:"Mallorca",
// 		HOTEL_LOCATION_CITY:"Canyamel",
// 		HOTEL_LOCATTION_LATITUDE:39.655643,
// 		HOTEL_LOCATION_LONGITUDE:3.4389138,
// 		HOTEL_ROOM_CODE:"DR",
// 		HOTEL_ROOM_NAME:"Doppelzimmer",
// 		HOTEL_BOARD_CODE:"HB",
// 		HOTEL_BOARD_NAME:"Halbpension",
// 		PRICE_ADULT_COMPETITOR:547.62,
// 		HOTEL_IMAGE_URL:"http://images.hlx.com/hotel/medico/pmi92b/canyamel/canyamel-classic-startbild-64732-2.jpg",
// 		PRICE_ADULT:378.96

var ComplexListItem = React.createClass({
	mixins: [Navigation],

	render: function () {

		var initials = this.props.offer.HOTEL_NAME;

		return (
			<Link to="details" viewTransition="show-from-right" params={{ user: this.props.offer, prevView: 'component-offer-list' }} className="list-item" component="div">
				<UI.ItemMedia avatar={this.props.offer.HOTEL_IMAGE_URL} avatarInitials={initials} />
				<div className="item-inner">
					<div className="item-content">
						<div className="item-title">{this.props.offer.HOTEL_NAME}</div>
						<div className="item-subtitle">{this.props.offer.HOTEL_LOCATION_COUNTRY}</div>
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

		console.log(Offers);

		return (
			<UI.View>
				<UI.Headerbar type="default" label="Relaxing in Spain">
					<UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
					<ComplexList offers={Offers} />
				</UI.ViewContent>
			</UI.View>
		);
	}
});
