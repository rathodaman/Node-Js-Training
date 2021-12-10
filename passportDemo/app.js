var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var session = require('express-session');
const passport = require('passport');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usermodel=require('./schema/userSchema');


var app = express();

// async function mymid(req,res,next){
//   try{
//     let data=await usermodel.find().lean();
//     res.locals.mydata=data;
//     console.log("Aman Rathod");
//     console.log(res.locals.mydata);
//     //res.send({mydata:res.locals.mydata});
//   }catch(err){
//     console.log(err);
//   }
//   console.log("hey middleware"+req.url);
//   next()
// }
// app.use(mymid);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'keyboard cat', 
  cookie: { maxAge: 60000 },
}));
app.use(passport.initialize());
app.use(passport.session());

//db connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myproject', { useNewUrlParser: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err))
//db connection end

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
