var React = require('react');
var Tappable = require('react-tappable');
var Navigation = require('touchstonejs').Navigation;
var Link = require('touchstonejs').Link;
var UI = require('touchstonejs').UI;
var Timers = require('react-timers');
var $ = require('jquery');



module.exports = React.createClass({
	mixins: [Navigation, Timers()],

	getInitialState: function () {
		return {
			popup: {
				visible: true
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

	componentDidMount: function() {
		console.log("Home Did  Mount")
	},

	render: function () {
		return (
			<UI.View>
				<UI.Headerbar type="default" label="News" />
				<UI.ViewContent grow scrollable>
					<div className="panel-header text-caps"> Subreddits </div>
					<div className="panel">

						<Link component="div" to="custom-list" viewTransition="show-from-right" className="list-item is-tappable"  params={{ subreddit: "News" }} >
							<div className="item-inner"> Worldnews </div>
						</Link>

						<Link component="div" to="custom-list" viewTransition="show-from-right" className="list-item is-tappable" params={{ subreddit: "News" }} >
							<div className="item-inner"> News </div>
						</Link>

						<Link component="div" to="custom-list" viewTransition="show-from-right" className="list-item is-tappable" params={{ subreddit: "Technology" }} >
							<div className="item-inner"> Technology </div>
						</Link>

						<Link component="div" to="custom-list" viewTransition="show-from-right" className="list-item is-tappable" params={{ subreddit: "Finance" }} >
							<div className="item-inner"> Finance </div>
						</Link>

						<Link component="div" to="custom-list" viewTransition="show-from-right" className="list-item is-tappable" params={{ subreddit: "Sports" }} >
							<div className="item-inner"> Sports </div>
						</Link>
						<Link component="div" to="custom-list" viewTransition="show-from-right" className="list-item is-tappable" params={{ subreddit: "Bitcoin" }} >
							<div className="item-inner"> Bitcoin </div>
						</Link>
					</div>
					
				</UI.ViewContent>
			</UI.View>
		);
	}
});
