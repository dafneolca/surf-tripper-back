var dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const passportSetup = require('./config/passport');
passportSetup(passport);

const authRoutes = require('./routes/auth-routes');
var user = require('./routes/user');
var index = require('./routes/index');
var trip = require('./routes/trip');

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

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use('/', index);
app.use('/user', user);
app.use('/trip', trip);
app.use('/auth', authRoutes);

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
