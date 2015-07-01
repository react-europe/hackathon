var React = require('react');
var Tappable = require('react-tappable');
var Navigation = require('touchstonejs').Navigation;
var Link = require('touchstonejs').Link;
var UI = require('touchstonejs').UI;

var Timers = require('react-timers');

var People = require('../../data/people');

module.exports = React.createClass({
	mixins: [Navigation, Timers()],

	getInitialState: function () {
		return {
			popup: {
				visible: false
			}
		};
	},
	showLoadingPopup: function () {
		this.setState({
			popup: {
				visible: true,
				loading: true,
				header: 'Loading',
				iconName: 'ion-load-c',
				iconType: 'default'
			}
		});

		var self = this;

		this.setTimeout(function () {
			self.setState({
				popup: {
					visible: true,
					loading: false,
					header: 'Done!',
					iconName: 'ion-ios7-checkmark',
					iconType: 'success'
				}
			});
		}, 2000);

		this.setTimeout(function () {
			self.setState({
				popup: {
					visible: false
				}
			});
		}, 3000);
	},

	render: function () {
		return (
			<UI.View>
				<UI.Headerbar type="default" label="Travelton Holidays - Always the Best Price" />
				<UI.ViewContent grow scrollable>

					<Link component="div" to="component-offer" viewTransition="show-from-right" className="teaser-product is-tappable">
						<img className="teaser-product__img" src="http://images.hlx.com/hotel/medico/kgs92b/psalidi/palm-beach-startbild-1988832-2.jpg"/>
					 	<div className="teaser-product__name">
							The Aeolos Beach
					 	</div>
						<div className="teaser-product__location">
							Lambi | Kos | Griechenland
					 	</div>
					</Link>
					<div className="panel-header text-caps">Hot Offers</div>
					<div className="panel">
						<Link component="div" to="component-offer-list" viewTransition="show-from-right" className="list-item is-tappable">
							<div className="item-inner">Hot Sommer in Paris</div>
						</Link>
						<Link component="div" to="component-offer-list" viewTransition="show-from-right" className="list-item is-tappable">
							<div className="item-inner">Relaxing in Spain</div>
						</Link>
					</div>
				</UI.ViewContent>
			</UI.View>
		);
	}
});
