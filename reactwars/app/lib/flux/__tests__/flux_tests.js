jest.dontMock('../index.js');
jest.dontMock('underscore');

describe('Flux', function() {
  var Flux;
  beforeEach(function() {
    Flux = require('../index.js');
  });

  describe('when creating an instance', function() {
    it('assings a dispatcher instance to _dispatcher', function() {
      var fluxInstance = new Flux();
      var Dispatcher = require('flux').Dispatcher;

      expect(fluxInstance._dispatcher).toEqual(jasmine.any(Dispatcher));
    });
  });

  describe('#createConstants', function() {
    describe('with service messages', function() {
      it('creates _COMPLETED and _FAILED versions of a message', function() {
        var consts = Flux.createConstants({
          serviceMessages: [ 'SEARCH' ]
        });

        expect(consts).toEqual({
          SEARCH: 'SEARCH',
          SEARCH_COMPLETED: 'SEARCH_COMPLETED',
          SEARCH_FAILED: 'SEARCH_FAILED'
        });
      });
    });

    describe('with generic messages', function() {
      it('mirrores the messages', function() {
        var consts = Flux.createConstants({
          messages: [ 'SEARCH' ]
        });

        expect(consts).toEqual({
          SEARCH: 'SEARCH'
        });
      });
    });

    describe('with values', function() {
      it('maintains the values', function() {
        var consts = Flux.createConstants({
          values: {
            MAX_SOMETHING: 12
          }
        });

        expect(consts).toEqual({
          MAX_SOMETHING: 12
        });
      });
    });
  });
});

