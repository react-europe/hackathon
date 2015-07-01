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
			bioValue: this.props.user.bio || ''
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
	
	randomIntensity: function() {
    return Math.round(Math.random()*256);
  },
  randomRGB: function () {
     return {
      r: this.randomIntensity(),
      g: this.randomIntensity(),
      b: this.randomIntensity()
    } 
  },
  returnRGBcss: function (rgb) {
    return "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
  },

	render: function () {
	  var topRGB = this.randomRGB();
	  var topRGBcss = this.returnRGBcss(topRGB);
	  var bottomRGB = this.randomRGB();
	  var bottomRGBcss = this.returnRGBcss(bottomRGB);
    var gradientStyle = {
      backgroundImage: "linear-gradient( "+topRGBcss+", "+bottomRGBcss+" )",
      width: '100%',
      height: '200%',
      position: 'absolute'
    };
		// fields
		return (
			<UI.View>
				<UI.Headerbar type="default" label={[this.props.user.name.first, this.props.user.name.last].join(' ')}>
					<UI.HeaderbarButton showView={this.props.prevView} viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
					<UI.LoadingButton loading={this.state.processing} disabled={!this.state.formIsValid} onTap={this.processForm} label="" className="Headerbar-button right is-primary" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
				  <div style={gradientStyle}></div>
				</UI.ViewContent>
			</UI.View>
		);
	}
});
