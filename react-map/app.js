var path = require('path');
var express = require('express');
var app = express();
var morgan = require('morgan');
var env = process.env.NODE_ENV || 'development';

module.exports = app;

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'jade');

app.get('/', function(req, res, next) {
  res.render('index');
});
