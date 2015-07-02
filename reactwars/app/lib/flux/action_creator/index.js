var _ = require('underscore')
  , inherits = require('../utils/inherits.js');

var ActionCreator = function() {};

_.extend(ActionCreator.prototype, {
  actions: {},
  serviceActions: {},
  mount: function(flux) {
    this._dispatcher = flux._dispatcher;
  },

  dispatchAction: function() {
    var args = Array.prototype.slice.call(arguments);
    this._dispatcher.dispatch({actionType: args.shift(), args: args});
  }
});

ActionCreator.extend = function (ChildProto) {
  var ChildFn = function() {
    ActionCreator.call(this);
  };

  inherits(ChildFn, ActionCreator)
  _.extend(ChildFn.prototype, ActionCreator.prototype);

  if (ChildProto) {
    _.extend(ChildFn.prototype, ChildProto);
  }

  return ChildFn;
};

module.exports = ActionCreator;
