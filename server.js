'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use('/assets', express.static(path.join(__dirname, 'public/')));
app.use(logger('dev'));
app.use(bodyParser());

app.get('/partials/:partialPath', function (request, response) {
  response.render(path.join('partials/', request.params.partialPath));
});

app.get('*', function (request, response) {
  response.render('index');
});

var port = 3000;

app.listen(port);

console.log('Listening on port ' + port + '...');
