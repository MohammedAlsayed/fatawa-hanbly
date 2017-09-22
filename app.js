var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var index = require('./routes/index');
var admin = require('./routes/admin');
var db = require('./config/database');
var app = express();
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var modules = {};




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const cookieExpirationTime = 24 * 60 * 60 * 1000; // this equals one day in milliseconds.
const checkExpirationTime = 12 * 60 * 60 * 1000; // this equals half a day in milliseconds.
app.use(session(
    {
      secret: 'keyboard cat',

      store: new SequelizeStore({
        db: db.sequelize,
        table: 'Sessions',
        expiration: cookieExpirationTime,
        checkExpirationInterval: checkExpirationTime
      }),
      resave: false,
      saveUninitialized: true
    }));

app.use(flash());

app.use('/', index);
app.use('/admin', admin);

app.listen(3000);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
