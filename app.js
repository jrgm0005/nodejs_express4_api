// app.js
var express = require('express');
var app = express();
// Add DB
var db = require('./db');

// configure app to use bodyParser() - Needed in Express4
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add routes
var routes = require('./routes');
app.use('/api', routes);

// Export app
module.exports = app;
