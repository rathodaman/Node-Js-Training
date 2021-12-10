var express = require('express');
var router = express.Router();
const passport = require("passport");
var LocalStrategy  = require('passport-local').Strategy;
var usermodel=require('../schema/userSchema');
var jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');  
const bcrypt = require('bcrypt');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf';
 passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log("hello aman");
     console.log(jwt_payload.email);
     usermodel.findOne({user_email: jwt_payload.email}, function(err, user) {
        if (err) {
            console.log(err);
            return done(err, false);
        }
        if (user) {
            console.log("User Data " + user);
            return done(null, user);
        } else {
            console.log('else');
            return done(null, false);
            // or you could create a new account
        }
    });
}));
 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//SignUp Get Method
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//SignUp Post Method Api
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

//MiddleWare to Check Auth
// var AuthJWT  = (req,res,next) => {
//   var token = req.headers.authorization;
//   console.log("my name is rathod");
//   console.log(token);
//   token = token.split(' ')[1];
//   console.log("hello rathod");
//   console.log(token);
//   var privateKey = 'sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf';
//   jwt.verify(token,privateKey,function(err,decoded){
//     if(err){
//         console.log(err);
//       res.send({message:'Invalid Token'});
//     }else{
//       console.log("hello rathod");
//       next();
//     }
//   })
// }

//api login start
router.post('/form-process',passport.authenticate('local',{failureRedirect : '/users/login'}),async function (req, res, next) {
  try{
    let email = req.body.user_email;
    let password = req.body.user_password;
   const db_users_array=await usermodel.findOne({ "user_email": email })
  
    var db_name = db_users_array.user_name;
    var db_email = db_users_array.user_email;
    var db_password = db_users_array.user_password;
    let isMatch= await bcrypt.compare(password,db_password)
    if(isMatch){
            //Token Key 32 Character
          var privateKey = "sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf"
          let params = {
              email : db_users_array.user_email,
              name: db_users_array.user_name,
              gender: db_users_array.user_gender,
              mobile: db_users_array.user_mobile,
              dob: db_users_array.user_dob
          }
          var token =  jwt.sign(params, privateKey); // , { expires_in: '500s' }
          console.log("Token is "  + token);

           res.send(JSON.stringify({"flag":1,"message":`Welcome ${db_name} ji`,"Token": token}));
          //res.redirect('/users/home');
    }
    else{
            if (db_email == null) {
              console.log("If");
              res.send(JSON.stringify({"status":200,"flag":0,"message":`Login Failes No user`}));
              //res.end("Email not Found");
            }
            else {
              console.log("Credentials wrong");
              res.send(JSON.stringify({"flag":0,"message":"Invalid Email & Password"}));
            }
    }
  }catch(err){
    res.send(JSON.stringify({"flag":0,"message":"Error","err":err}));
  }
});
//api login end

//home page Api
router.get('/home',passport.authenticate('jwt', { session: false }),function(req, res, next) {
   console.log(req.user)
   res.locals.mydata=req.user;
  res.json(res.locals.mydata)
});

//contact page Api
router.get('/contact',passport.authenticate('jwt', { session: false }), function (req, res, next) {
  console.log(req.user)
  res.locals.mydata=req.user;
  res.json(res.locals.mydata)
});

//About page Api
router.get('/about',passport.authenticate('jwt', { session: false }), function (req, res, next) {
  console.log(req.user)
  res.locals.mydata=req.user;
  res.json(res.locals.mydata)
});

//Logout Method Router
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});


///Change Paassword Api Page Route
router.get('/changePassword', function (req, res, next) {

  if (!req.user) {
    return res.end("Login required to Access this Change Password page");
    //return res.redirect('/login');
  }
  res.render('change-password');
});

//Change Password Api Process Page
router.post('/changePassword', function (req, res, next) {
  
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


//display table Api
router.get('/display-table', passport.authenticate('jwt',{session:false}), function (req, res, next) {
 console.log("display aman data");
 console.log(req.user);
  usermodel.find(function (err, db_users_array) {
    if (err) {
      console.log("Error in Fetch Data " + err);
      res.send(JSON.stringify({"flag":0,"message":"Error in Api","err":err}));
    } else {
      console.log(db_users_array);
      //res.render('display-table', { user_array: db_users_array });
      res.send(JSON.stringify({"flag":1,"message":"Data Listening","data":db_users_array}));
    }
  });
});



module.exports = router;
