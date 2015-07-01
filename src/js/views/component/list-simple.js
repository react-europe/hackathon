var React = require('react'),
	SetClass = require('classnames'),
	Tappable = require('react-tappable'),
	Navigation = require('touchstonejs').Navigation,
	Link = require('touchstonejs').Link,
	UI = require('touchstonejs').UI;
var assign = require('react/lib/Object.assign');

var FileList = React.createClass({
	render: function () {
    var items = this.props.files.map( (filename, i) => {
      var props = assign({}, {
        path: this.props.path,
        key: `${filename}-${i}`,
        name: filename
      });
      return React.createElement(FileListItem, props);
    });
		return (
			<div>
				<div className="panel panel--first">
					{items}
				</div>
			</div>
		);
	}
});

var FileListItem = React.createClass({
	mixins: [Navigation],

	render: function () {
    var linkTo = 'component-list-'
    var children = [];
    for(var i = 0; i < this.props.depth; i++) {
      children.push('child');
    }

		return (
			<Link to={'file-reader'} viewTransition="show-from-right"
			  params={{ name: this.props.name, path: this.props.path, prevView: 'home' }}
			  className="list-item is-tappable" component="div">
				<div className="item-inner">
					<div className="item-title">{this.props.name}</div>
				</div>
			</Link>
		);
	}
});

var SimpleListItem = React.createClass({
	mixins: [Navigation],

	render: function () {
    var linkTo = 'component-list-'
    var children = [];
    for(var i = 0; i < this.props.depth; i++) {
      children.push('child');
    }

		return (
			<Link to={linkTo + children.join('-')} viewTransition="show-from-right"
			  params={{chapters: this.props.children, path: this.props.path, files: this.props.files, prevView: 'component-simple-list' }}
			  className="list-item is-tappable" component="div">
				<div className="item-inner">
					<div className="item-title">{this.props.name}</div>
				</div>
			</Link>
		);
	}
});

var SimpleList = React.createClass({
	render: function () {
    var items = this.props.chapters.map( (chapter, i) => {
      var props = assign({}, chapter, {
        path: this.props.path + '/' + chapter.name,
        key: `${chapter.name}-${i}`,
        depth: this.props.depth + 1 });
      return React.createElement(SimpleListItem, props);
    });
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
					<SimpleList depth={1} path={this.props.path || ''} chapters={this.props.chapters || []} />
					<FileList depth={1} path={this.props.path || ''} files={this.props.files || []} />
				</UI.ViewContent>
			</UI.View>
		);
	}
});
