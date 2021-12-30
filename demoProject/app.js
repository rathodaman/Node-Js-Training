var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const userModel=require("./schema/userSchema");
const {engine}=require('express-handlebars');
const CronJob = require('cron').CronJob;
const Cron= require('./cron/cron')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',engine({
  defaultLayout: 'main',
  extName: '.handlebars',
}))
app.set('view engine', 'handlebars');

let object = {
  name: "Admin",
  email: "admin@admin.com",
  phone: "1234567890",
  password: "123456"
}

async function mymid(req,res){
  try{
    let data=await userModel.find({email:object.email});
    console.log("find data is ")
    console.log(data)
    console.log(Object.keys(data).length)
    if(Object.keys(data).length){
      console.log("USER ALredy exist")
    }
    else{
      let data=await userModel.create(object);
      console.log("insertion data signup successfull" +data);
    }
  }catch(err){
    console.log("error in insertion data signup" +err);
  }

}
mymid();


/////////cron Start////////////////////////////////
// Creating a cron job which runs on every 30 second
// var job = new CronJob('* * * * * *',async function() {
//   // var job = new CronJob('* * * * * *', function() { 
//   console.log('You will see this message every second');
  
  
// }, null, true, 'America/Los_Angeles');
// job.start();
/////////cron End/////////////////////////////////





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//db connection
mongoose.promise=global.promise;
mongoose.connect('mongodb://demoProject:demoProject@localhost:27017/demoProject')
.then(()=>console.log("connection open"))
.catch((err)=>console.error(err))
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
