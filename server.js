'use strict';

var express = require('express'),
app = express(),
port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/app/build'));
app.listen(port);
console.log("Server started at port " + port);
