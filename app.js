var dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var user = require('./routes/user');
var index = require('./routes/index');
var trip = require('./routes/trip');
var cors = require('cors');
var app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/', index);
app.use('/user', user);
app.use('/trip', trip);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404);
  res.json({ error: 'error.not-found' });
});

// error handler
app.use(function (err, req, res, next) {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headerSent) {
    res.status(500);
    res.json({ error: 'error.unexpected' });
  }
});

module.exports = app;
