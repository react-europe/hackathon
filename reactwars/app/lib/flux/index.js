'use strict';

var Dispatcher = require('flux').Dispatcher
  , Store = require('./store/index.js')
  , ActionCreator = require('./action_creator/index.js')
  , _ = require('underscore')
  , keyMirror = require('mirrorkey');

var stores = [];
var actionCreators = [];

var Flux = function(storeStates) {
  this._dispatcher = new Dispatcher();
  this.storeStates = storeStates;
};

Flux.prototype.getStoreState = function(storeName) {
  if (this.storeStates !== undefined) {
    return this.storeStates[storeName];
  }
};

Flux.createStore = function(proto) {
  var thisStore = Store.extend(proto)
  var store = new thisStore();
  stores.push(store);
  return store;
};

Flux.createConstants = function(constDefinition) {
  var messages = [];
  /* Add service messages */
  if (constDefinition.serviceMessages) {
    _.each(constDefinition.serviceMessages, function(serviceMessage) {
      messages.push(serviceMessage);
      messages.push(serviceMessage+'_COMPLETED');
      messages.push(serviceMessage+'_FAILED');
    });
  }

  /* Add normal messages */
  if (constDefinition.messages) {
    messages = _.union(messages, constDefinition.messages);
  }

  return _.extend({}, keyMirror(messages), constDefinition.values);
};

Flux.createActionCreator = function(proto) {
  var thisActionCreator = ActionCreator.extend(proto);
  var actionCreator = new thisActionCreator();
  actionCreators.push(actionCreator);

  return actionCreator;
};

Flux.start = function(storeStates) {
  var flux = new Flux(storeStates);
  _.each(stores, function(store) {
    store.mount(flux);
  });
  _.each(actionCreators, function(actionCreator) {
    actionCreator.mount(flux);
  });

  return flux;
};

module.exports = _.extend(Flux, { Stores: stores });
