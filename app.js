var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var db = require('./db');

// import routes
const index = require('./routes/index');
const api = require('./routes/api');
const ingest = require('./routes/ingest');
const byeweek = require('./routes/byeweek');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// set routes
app.use('/', index);
app.use('/api', api); // sample API Routes
app.use('/ingest', ingest); // sample API Routes
app.use('/byeweek', byeweek); // sample API Routes

module.exports = app;

