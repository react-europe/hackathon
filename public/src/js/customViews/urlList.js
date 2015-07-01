var React = require('react'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI,
	$ = require('jquery');

var ArticlesStore = require('../stores/ArticlesStore');
var AppActions = require('../actions/AppActions');

var People = require('../../data/people');

var ComplexListItem = React.createClass({
	mixins: [Navigation],

	componentDidMount: function(){
		
		$.ajax({
		 	url: this.props.urlWrapper.url,
			async: true,
			success: function(data) {
				var matches = data.match(/<title>(.*?)<\/title>/);
			}   
		});
	},

	render: function () {
		console.log(this.props)
		
		return (
			<Link to="url-list"  viewTransition="show-from-right" params={{ submission: this.props.urlWrapper, prevView: 'custom-list' }} className="list-item" component="div">
				<div className="item-inner">
					<div className="item-content">
						<div className="item-title">
							<a href={this.props.urlWrapper.url}>
								{this.props.urlWrapper.url}
							</a>
						</div>
					</div>
					<UI.ItemNote type="default" label={""} icon="ion-chevron-right" />
				</div>
			</Link>
		);
	}
});

var ComplexList = React.createClass({
	render: function () {
		var urls = [];
		console.log(this.props.submissions);
		var urlWrapper;
		this.props.submissions.uniqueUrls.forEach(function (url, i) {
			urlWrapper = {
				url : url,
				key : 'url-' + i
			}

			urls.push(React.createElement(ComplexListItem, { urlWrapper: urlWrapper }));
		});
		
		return (
			<div>
				<div className="panel panel--first avatar-list">
					{urls}
				</div>
			</div>
		);
	}
});

module.exports = React.createClass({
	mixins: [Navigation],

	getDefaultProps: function() {
		return {
			submission: {} 
		};
	},

	componentDidMount: function() {
	},

	render: function () {
		console.log("rendering list view")
		return (

			<UI.View>
				<UI.Headerbar type="default" label="Popular Urls on Twitter">
					<UI.HeaderbarButton showView="home" viewTransition="reveal-from-right" label="Back" icon="ion-chevron-left" />
				</UI.Headerbar>
				<UI.ViewContent grow scrollable>
					<ComplexList submissions={this.props.submission} />
				</UI.ViewContent>
			</UI.View>
		);
	}
});
