var React = require('react'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI;

var ArticlesStore = require('../stores/ArticlesStore');
var AppActions = require('../actions/AppActions');

var People = require('../../data/people');

var ComplexListItem = React.createClass({
	mixins: [Navigation],

	render: function () {
		console.log(this.props)
		var hashtags = "";
		console.log(this.props.submission.popularHashtags)
		for (var i =0 ; i < this.props.submission.popularHashtags.length; i++) {
			hashtags += "#"+this.props.submission.popularHashtags[i]+" ";
		}

		return (
			<Link to="url-list" viewTransition="show-from-right" params={{ submission: this.props.submission, prevView: '' }} className="list-item" component="div">
				<div className="item-inner">
					<div className="item-content">
						<div className="item-title">{this.props.submission.title}</div>
						<div className="item-subtitle">{hashtags}</div>
						<div className="item-subtitle">{this.props.submission.uniqueUrls.length} other news sources found</div>
					</div>
					<UI.ItemNote type="default" label={""} icon="ion-chevron-right" />
				</div>
			</Link>
		);
	}
});

var ComplexList = React.createClass({
	render: function () {
		var submissions = [];
		console.log(this.props.submissions);
		this.props.submissions.forEach(function (submission, i) {
			submission.key = 'submission-' + i;
			submissions.push(React.createElement(ComplexListItem, { submission: submission }));
		});
		
		return (
			<div>
				<div className="panel panel--first avatar-list">
					{submissions}
				</div>
			</div>
		);
	}
});

module.exports = React.createClass({
	mixins: [Navigation],

	getInitialState: function() {
		return {
			submissions: [] 
		};
	},

	componentDidMount: function() {
		var self = this;
		ArticlesStore.getSubmissionsData().then(function(articles) {
			console.log(articles);
			self.setState({
				'submissions' : articles
			})
		});
	},

	render: function () {
		console.log("rendering list view")
		return (

			<UI.View>
				<UI.Headerbar type="default" label="News Articles">
					<UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
					<ComplexList submissions={this.state.submissions} />
				</UI.ViewContent>
			</UI.View>
		);
	}
});
