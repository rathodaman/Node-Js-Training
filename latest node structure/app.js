//set environment
require('custom-env').env();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
const session = require('express-session');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
const hbs = exphbs.create(require('./helpers/handlebar.js'));
// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.use(cookieSession({
  secret: "session",
  key: 'dsfsdfaf5554',
}));
//express session
app.use(session({
  secret: 'dsfsdfaf5554',
  resave: true,
  saveUninitialized: true,
  maxAge: Date.now() + 30 * 86400 * 1000,
  cookie: { secure: true }
}));
//use connect flash
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (process.env.APP_ENV == 'production' && (path.endsWith('.css') || path.endsWith('.js') || path.endsWith('.svg'))) {
      res.setHeader('Cache-Control', 'max-age=79200');
    }
  },
}));

const {
  commonMiddelware,
  flashMiddelware
} = require("./common/middleware");

//set middelware
app.use(commonMiddelware);
app.use(flashMiddelware);

//set routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
