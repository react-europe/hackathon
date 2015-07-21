var React = require('react'),
	Tappable = require('react-tappable'),
	Dialogs = require('touchstonejs').Dialogs,
	Navigation = require('touchstonejs').Navigation,
	UI = require('touchstonejs').UI;

var Timers = require('react-timers')

module.exports = React.createClass({
	mixins: [Navigation, Dialogs, Timers()],

	getDefaultProps: function () {
		return {
			prevView: 'home'
		}
	},

	getInitialState: function () {
		return {
			processing: false,
			formIsValid: false,
			bioValue: ''
		}
	},

	showFlavourList: function () {
		this.showView('radio-list', 'show-from-right', { user: this.props.user, flavour: this.state.flavour });
	},

	handleBioInput: function (event) {
		this.setState({
			bioValue: event.target.value,
			formIsValid: event.target.value.length ? true : false
		});
	},

	processForm: function () {
		var self = this;

		this.setState({ processing: true });

		this.setTimeout(function () {
			self.showView('home', 'fade', {});
		}, 750);
	},

	flashAlert: function (alertContent, callback) {
		return callback(this.showAlertDialog({ message: alertContent }));
	},

	render: function () {

		// fields
		return (
			<UI.View>
				<UI.Headerbar type="default" label={this.props.user.HOTEL_NAME}>
					<UI.HeaderbarButton showView={this.props.prevView} viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
					<UI.LoadingButton loading={this.state.processing} disabled={!this.state.formIsValid} onTap={this.processForm} label="Save" className="Headerbar-button right is-primary" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
					<div className="panel-header text-caps">
						<img className="teaser-product__img" src={this.props.user.HOTEL_IMAGE_URL}/>
						 	<div className="teaser-product__name">
								{this.props.HOTEL_NAME}
						 	</div>
							<div className="teaser-product__location">
								{this.props.user.HOTEL_LOCATION_COUNTRY} | {this.props.user.HOTEL_LOCATION_REGION} | {this.props.user.HOTEL_LOCATION_CITY}
						 	</div>
					</div>
					<div className="panel panel--first">
						<UI.LabelInput label="Name"     value={this.props.user.HOTEL_NAME}       placeholder="Full name" first />
						<UI.LabelInput label="Location" value={this.props.user.HOTEL_LOCATION_COUNTRY}   placeholder="Suburb, Country" />
						<UI.LabelInput label="Room" value={this.props.user.HOTEL_ROOM_NAME}   placeholder="Room" />
						<UI.LabelInput label="Board" value={this.props.user.HOTEL_BOARD_NAME}   placeholder="Board" />
						<UI.LabelInput label="Price" value={this.props.user.PRICE_ADULT + " €"}   placeholder="Price" />
					</div>
					<Tappable onTap={this.flashAlert.bind(this, 'You clicked the Primary Button.')} className="panel-button primary" component="button">
						book now!
					</Tappable>
				</UI.ViewContent>
			</UI.View>
		);
	}
});
