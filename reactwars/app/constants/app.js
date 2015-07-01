var Flux = require('../lib/flux');
var AppConstants = Flux.createConstants({
  messages: [ 'INIT', 'USER_UPDATED' ]
});

module.exports = AppConstants;
