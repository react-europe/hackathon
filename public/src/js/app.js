var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classnames = require('classnames');
var Touchstone = require('touchstonejs');
var config = require('./config');
var AppActions = require('./actions/AppActions')
var ArticlesStore = require('./stores/ArticlesStore')

var views =require('./views')

var App = React.createClass({
  mixins: [Touchstone.createApp(views)],

  getInitialState: function () {
    var startView = 'home';
    // resort to #viewName if it exists
    if (window.location.hash) {
      var hash = window.location.hash.slice(1);

      if (hash in views) startView = hash;
    }

    var initialState = {
      currentView: startView,
      isNativeApp: (typeof cordova !== 'undefined')
    };

    return initialState;
  },

  componentDidMount: function() {
    
    //ArticlesStore.getSubmissionsData().then(function(articles){
    //
    //});
  },

  gotoDefaultView: function () {
    this.showView('home', 'fade');
  },

  render: function () {
    var appWrapperClassName = classnames({
      'app-wrapper': true,
      'is-native-app': this.state.isNativeApp
    });

    return (
      <div className={appWrapperClassName}>
        <div className="device-silhouette">
          <ReactCSSTransitionGroup transitionName={this.state.viewTransition.name} transitionEnter={this.state.viewTransition.in} transitionLeave={this.state.viewTransition.out} className="view-wrapper" component="div">
            {this.getCurrentView()}
          </ReactCSSTransitionGroup>
        </div>
        <div className="demo-wrapper">
          <img src="img/logo-mark.svg" alt="TouchstoneJS" className="demo-brand" width="80" height="80" />
          <h1>
            Out of your Bubble News Reader
            <small> Demo</small>
          </h1>
          
          <ul className="demo-links">
            <li><a href="https://twitter.com/rakannimer" target="_blank" className="ion-social-twitter">Twitter</a></li>
            <li><a href="https://github.com/rakannimer" target="_blank" className="ion-social-github">Github</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

function startApp () {
  React.render(<App />, document.getElementById('app'));
}

function onDeviceReady () {
  StatusBar.styleDefault();
  startApp();
}

if (typeof cordova === 'undefined') {
  startApp();
} else {
  document.addEventListener('deviceready', onDeviceReady, false);
}
