var app = require('./app');
var http = require('http');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port:', app.get('port'));
});
