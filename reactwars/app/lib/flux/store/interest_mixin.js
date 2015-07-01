var I = require('immutable')
  , _ = require('underscore');

var Stores = require('lib/flux').Stores.reduce(function(stores, store) {
  stores[store.name] = store;
  return stores;
}, {});

var StoreInterestMixin = {
  componentDidMount: function() {
    var storeInterests = this.getStoreInterests();
    var self = this;
    this._reverseStoreIndex = {};

    _.each(storeInterests, function(storePath, stateKey) {
      var storeSegments = storePath.split('.');
      var store = storeSegments.shift();

      if (self._reverseStoreIndex[store] === undefined) {
        // First time we meet with this store, so we need
        // to register interest
        Stores[store].changed.add(self._handleStoreChange);
        self._reverseStoreIndex[store] = {};
      }

      self._reverseStoreIndex[store][stateKey] = storeSegments;
    });
  },

  componentWillUnmount: function() {
    var self = this;
    _.each(this._reverseStoreIndex, function(_storeDef, store) {
      Stores[store].changed.remove(self._handleStoreChange);
    });
  },

  _handleStoreChange: function(store, newState) {
    var self = this, mutation = {};

    _.each(this._reverseStoreIndex[store], function(storePath, stateKey) {
      var newStateNode = newState.getIn(storePath);
      if (!I.is(self.state[stateKey], newStateNode)) {
        mutation[stateKey] = newStateNode;
      }
    });

    if (!_.isEmpty(mutation)) {
      this.setState(mutation);
    }
  }
};

module.exports = StoreInterestMixin;
