var express = require('express');
var router = express.Router();
const passport = require("passport");
var LocalStrategy  = require('passport-local').Strategy;
var usermodel=require('../schema/userSchema');
var jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');  
const bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//SignUp Get Method
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//SignUp Post Method
router.post('/signup',async function(req, res, next) {
  try{
    console.log("hello");
    console.log(req.body);
    const mybodydata=({
      user_name: req.body.user_name,
      user_gender: req.body.user_gender,
      user_dob: req.body.user_dob,
      user_mobile: req.body.user_mobile,
      user_email: req.body.user_email,
      user_password: req.body.user_password,
    });
    var data=await usermodel.create(mybodydata);
    console.log("insertion data signup successfull" +data);
      //res.redirect('/login');
      res.send(JSON.stringify({'flag':1,'message':'record Added'}));
  }catch(err){
    console.log("error in insertion data signup" +err);
      res.send(JSON.stringify({'flag':0,'message':'error in API','err':err}));
  }
});

//login get method
router.get('/login', function(req, res, next) {
  res.render('login');
});

// login normal passport start
passport.use(new LocalStrategy({
  usernameField: 'user_email',
  passwordField: 'user_password'
  },
  async function(username, password, done) {
    try{
      console.log("Passport "+ username + password);
     const user= await usermodel.findOne({ user_email: username });
        console.log("aman rathod");
        console.log(user);
        const isMatch= await bcrypt.compare(password,user.user_password)
        console.log("hello");
        console.log(isMatch);
        if(isMatch){
          return done(null, user);
        }else{
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (user.user_password != password) {
            return done(null, false, { message: 'Incorrect password.' }); 
          }
        }
    }catch(err){
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.user_email);
});

passport.deserializeUser(function(email, done) {
  usermodel.findOne({ user_email:email }, function(err, user) {
      done(err,user);
    })
});

//login post Method
router.post('/form-process', function(req, res, next) {
  passport.authenticate('local',{
    failureRedirect : '/login',
    successRedirect :'/home',
  })(req,res,next);
});
// login normal passport End

//home page get 
router.get('/home', function (req, res, next) {
   //console.log("hello"+req.session.passport.user);
    console.log(req.user);
  //Auth
  if (!req.user) {
    console.log("Email Session is Set");
   return res.end("Login required to Access this Home page");
  }
  res.locals.mydata=req.user;
  res.render('home');
});

//contact page
router.get('/contact', function (req, res, next) {
  //Auth
  if (!req.user) {
    console.log("Email Session is Set");
    return res.end("Login required to Access this Contact page");
  }
  res.locals.mydata=req.user;
  res.render('contact');
});

//About page
router.get('/about', function (req, res, next) {
  //Auth
  if (!req.user) {
    console.log("Email Session is Set");
    return res.end("Login required to Access this About page");
  }
  res.locals.mydata=req.user;
  res.render('about');
});

//Logout Method Router
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

//Change Paassword Page Route
router.get('/changePassword', function (req, res, next) {

  if (!req.user) {
    return res.end("Login required to Access this Change Password page");
    //return res.redirect('/login');
  }
  res.render('change-password');
});

//Change Password Process Page
router.post('/changePassword', function (req, res, next) {
  if (!req.user) {
    return res.end("Login required to Access this Change Password page");
    // return res.redirect('/login');
  }
  console.log("Home Called " + req.user.user_email);
  let myemail = req.user.user_email;
  let opass = req.body.opass;
  let npass = req.body.npass;
  let cpass = req.body.cpass;

  usermodel.findOne({ "user_email": myemail },async function (err, db_users_array) {

    if (err) {
      console.log("Error in Old Password Fetch " + err);
    } else {
      console.log(db_users_array);
      let isMatch= await bcrypt.compare(opass,db_users_array.user_password)
      if(isMatch){
        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {

          if (npass == cpass) {
            npass=await bcrypt.hash(req.body.npass,10);
            usermodel.findOneAndUpdate({ "user_email": myemail }, {$set: {"user_password": npass}}, function (err) {
           
              if(err)
              {
                res.end("Error in Update"+err);
              }else{ 

                res.send("Password Changed");
              }
           
            });

          } else {
            res.end("New Password and Confirm Password not match");
          }

        }

      } else {
        res.end("Old Password Not Match");
      }

    }
  });
});



//display table
router.get('/display-table', function (req, res, next) {
  usermodel.find(function (err, db_users_array) {
    if (err) {
      console.log("Error in Fetch Data " + err);
      res.send(JSON.stringify({"flag":0,"message":"Error in Api","err":err}));
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('display-table', { user_array: db_users_array });
      //res.send(JSON.stringify({"flag":1,"message":"Data Listening","data":db_users_array}));
    }
  });
});

//delete get method
router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  usermodel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in Delete"+err)
    }
    else{
      console.log("data Deleted"+data);
     res.redirect('/display-table');
    }
  });
});

//Edit get method
router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  usermodel.findById(editid,function(err,data){
    if(err){
      console.log("error in update" + err);
    }
    else{
      console.log("Data updated Successfully" + data);
      res.render('edit',{editdata:data});
    }
  })
 });
 
 //Edit post method
 router.post('/edit/:id', function(req, res, next) {
   var editid=req.params.id;
   const mybodydata={
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
   }
   usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
     if(err){
       console.log("error in update"+err);
     }
     else{
       console.log("data updated"+data);
      res.redirect('/display-table');
     }
   });
 });

module.exports = router;
