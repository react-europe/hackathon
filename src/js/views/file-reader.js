var React = require('react'),
	Tappable = require('react-tappable'),
	Dialogs = require('touchstonejs').Dialogs,
	Navigation = require('touchstonejs').Navigation,
	UI = require('touchstonejs').UI;

var Timers = require('react-timers')
var marked = require('marked')

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
	    md: 'loading...'
		}
	},

  componentWillMount: function() {
    var prefix = 'https://raw.githubusercontent.com/steeve/france.code-civil/master';
    var uri = `${prefix}${this.props.path}/${this.props.name}`;
    fetch(uri).then((resp) => {
      return resp.text();
    }).then((md) => {
      this.setState({md: md});
    });
  },

  body: function(md) {
    return {__html: marked(md) };
  },

	render: function () {
		return (
			<UI.View>
				<UI.Headerbar type="default" label={this.props.name}>
					<UI.HeaderbarButton showView={this.props.prevView} viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
					<div className="panel panel--first">
            <div dangerouslySetInnerHTML={this.body(this.state.md)} />
					</div>
				</UI.ViewContent>
			</UI.View>
		);
	}
});
