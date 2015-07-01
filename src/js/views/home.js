var React = require('react');
var Tappable = require('react-tappable');
var Navigation = require('touchstonejs').Navigation;
var Link = require('touchstonejs').Link;
var UI = require('touchstonejs').UI;

var Timers = require('react-timers');
var Book = require('../../data/book');

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
				<UI.Headerbar type="default" label="Markdown Reader" />
				<UI.ViewContent grow scrollable>
					<div className="panel">
						<Link component="div" to="component-simple-list"
						  params={{chapters: Book, files: [] }}
              viewTransition="show-from-right" className="list-item is-tappable">
							<div className="item-inner">France Code Civil</div>
						</Link>
					</div>
				</UI.ViewContent>
			</UI.View>
		);
	}
});
