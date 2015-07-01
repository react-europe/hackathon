var React = require('react/addons');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classnames = require('classnames');

var Touchstone = require('touchstonejs');

var config = require('./config');

var views = {

  // app
  'home': require('./views/home'),

  // components
  'component-feedback': require('./views/component/feedback'),

  'component-headerbar': require('./views/component/bar-header'),
  'component-headerbar-search': require('./views/component/bar-header-search'),
  'component-alertbar': require('./views/component/bar-alert'),
  'component-actionbar': require('./views/component/bar-action'),
  'component-footerbar': require('./views/component/bar-footer'),

  'component-passcode': require('./views/component/passcode'),
  'component-toggle': require('./views/component/toggle'),
  'component-form': require('./views/component/form'),

  'component-file-list': require('./views/component/file-list'),
  'component-simple-list': require('./views/component/list-simple'),
  'component-list-child': require('./views/component/list-simple'),
  'component-list-child-child': require('./views/component/list-simple'),
  'component-complex-list': require('./views/component/list-complex'),
  'component-categorised-list': require('./views/component/list-categorised'),


  // transitions
  'transitions': require('./views/transitions'),
  'transitions-target': require('./views/transitions-target'),

  // details view
  'details': require('./views/details'),
  'file-reader': require('./views/file-reader')
};

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
