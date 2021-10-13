var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs =require('express-handlebars');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var _handlebars = require('handlebars')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var productRouter = require('./routes/product');
var stateRouter = require('./routes/state');
var cityRouter = require('./routes/city');
var areaRouter = require('./routes/area');

var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({
  defaultLayout:false,
  handlebars: allowInsecurePrototypeAccess(_handlebars)

}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge:
  60000 }}))

//Db Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://adminltedb:adminltedb@localhost:27017/adminltedb")
.then(() => console.log("Connected Successfully"))
.catch((err) => console.log(err))

app.use('/', indexRouter);
app.use('/admin/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/admin/category', categoryRouter);
app.use('/admin/subcategory', subcategoryRouter);
app.use('/admin/product', productRouter);
app.use('/admin/state', stateRouter);
app.use('/admin/city', cityRouter);
app.use('/admin/area', areaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
