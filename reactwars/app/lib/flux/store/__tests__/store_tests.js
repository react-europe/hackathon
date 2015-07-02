jest.dontMock('../index.js');
jest.dontMock('../../index.js');
jest.dontMock('underscore');

describe('Flux.Store', function() {
  var Store, Flux;
  beforeEach(function() {
    Store = require('../index.js');
    Flux = require('../../index.js');
  });

  describe('#mount', function() {
    beforeEach(function() {
      this.store = new Store();
      this.flux = new Flux();
    });

    it('sets the state', function() {
      spyOn(this.store, '_setState');
      this.store.mount(this.flux);

      expect(this.store._setState).toHaveBeenCalled();
    });

    it('configures the actions', function() {
      spyOn(this.store, '_configureActions');
      this.store.mount(this.flux);

      expect(this.store._configureActions).toHaveBeenCalled();
    });
  });

  describe('#_resetState', function() {
    it('sets the state of the store', function() {
      var store = Flux.createStore({
        getInitialState: function() {
          return {test: true};
        }
      });

      store.mount(new Flux());
      expect(store.state).toEqual({test: true});
    });
  });

  describe('#_configureActions', function() {
  });
});

