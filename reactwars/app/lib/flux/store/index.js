var _ = require('underscore')
  , inherits = require('../utils/inherits.js')
  , signals = require('signals')
  , I = require('immutable');

var Store = function() {}

_.extend(Store.prototype, {
  mount: function(flux) {
    this._setState(_.extend(this.getInitialState(), flux.getStoreState(this.name) || {}));
    this._configureActions();
    this.dispatchToken = flux._dispatcher.register(
      _.bind(this._handleAction, this)
    );
    this.changed = new signals.Signal();
  },

  getInitialState: function() {
    return {};
  },

  _handleAction: function(action) {
    var handler = this._actionMap[action.actionType];
    var oldState = this.state;
    if (typeof handler == 'function') {
      handler.apply(this, action.args);

      if (!I.is(oldState, this.state)) {
        // Defer the dispatch to views, to end the
        // "action dispatching" scope here.
        var _this = this;
        _.defer(function() {
          _this.changed.dispatch(_this.name, _this.state);
        });
      }
    }
  },

  _setState: function(data) {
    this.state = I.fromJS(data || this.getInitialState());
  },

  _configureActions: function() {
    var self = this;
    this._actionMap = {};

    if (this.actions === undefined) {
      return;
    }

    this.actions.forEach(function(actionDefinition) {
      self._configureAction.apply(self, actionDefinition);
    });
  },

  _configureAction: function(name, handler) {
    this._validateActionDefinition(name, handler);
    this._actionMap[name] = _.bind(handler, this);
  },

  _validateActionDefinition: function(name, handler) {
    if (name == undefined || typeof handler !== 'function') {
      throw new Error('Action is not defined correctly');
    }
  },
});

Store.extend = function(ChildProto) {
  var ChildStore = function() {
    Store.call(this);
  };

  inherits(ChildStore, Store);
  _.extend(ChildStore.prototype, Store.prototype);

  if (ChildProto) {
    _.extend(ChildStore.prototype, ChildProto);
  }

  return ChildStore;
}

module.exports = Store;
