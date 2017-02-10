'use strict'

var express = require('express'),
		logger = require('morgan'),
		bodyParser = require('body-parser'),
		path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use('/assets', express.static(path.join(__dirname, 'public/')));
app.use(logger('dev'));
app.use(bodyParser());

app.get('/partials/:partialPath', function(request, response){
	response.render('partials/' + request.params.partialPath);	
});

app.get('*', function(request,response){
	response.render('index');
});

var port = 3000;

app.listen(port);

console.log('Listening on port ' + port + '...');