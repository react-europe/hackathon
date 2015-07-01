var React = require('react'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI;

var FileList = React.createClass({
	render: function () {
    var items = [];
		return (
			<div>
				<div className="panel panel--first">
					{items}
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
				<UI.Headerbar type="default" label="Simple List">
					<UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
				  <FileList />
				</UI.ViewContent>
			</UI.View>
		);
	}
});
