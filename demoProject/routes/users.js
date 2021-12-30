var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken'); 
const { check, validationResult } = require('express-validator'); 
const userModel = require('../schema/userSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//MiddleWare to Check Auth with JWT
var AuthJWT  = (req,res,next) => {
  var token = req.headers.authorization;
  console.log("hello token"+ token);
  token = token.split(' ')[1];
  var privateKey = 'sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf';
  jwt.verify(token,privateKey,function(err,decoded){
    if(err){
        console.log(err);
      res.send({message:'Invalid Token'});
    }else{
      next();
    }
  })
}

//SignUp Get Method
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//SignUp Api Post Method
router.post('/signupApi',
[
  check('email')
  .notEmpty().withMessage('Email is Required').trim().escape().normalizeEmail()
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        userModel.findOne({email:req.body.email}, function(err, data){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(Boolean(data)) {
            reject(new Error('E-mail already in use'))
          }
          resolve(true)
        });
      });
    }),
  check('name').notEmpty().withMessage('Name is Required').trim().escape(),
  check('password').not().isEmpty().withMessage('password is required').trim()
  .isLength({ min: 6, max: 15 }).withMessage('password length must be between 6 and 15 characters'),
  check('phone')
  .notEmpty().withMessage('Mobile No is Required')
  .isLength({ min: 10, max: 10 }).withMessage('Mobile number should contains 10 digits')
  .custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      userModel.findOne({phone:req.body.phone}, function(err, data){
        if(err) {
          reject(new Error('Server Error'))
        }
        if(Boolean(data)) {
          reject(new Error('This Phone No.is already Exits'))
        }
        resolve(true)
      });
    });
  }),
],async function(req, res, next) {
  try{
    const errors = validationResult(req).mapped();
    // console.log(errors);
    // console.log(req.body);
    // console.log(req.body.name);
        if (errors.email) {
          console.log("Error in  email" + errors.email.msg);
        res.json(errors.email.msg)
        }
        if (errors.name) {
          console.log("Error in  name" + errors.name.msg);
        res.json(errors.name.msg)
        }
        if (errors.password) {
          console.log("Error in  password" + errors.password.msg);
        res.json(errors.password.msg)
        }
        if (errors.phone) {
          console.log("Error in  phone" + errors.phone.msg);
        res.json(errors.phone.msg)
        }
        if(Object.keys(errors).length){
          let data=req.body;
            //res.render('signup', {errors: errors,data:data});
           res.send(errors,data);
        }
        else{
          console.log("hello");
          //console.log(req.body);
          const mybodydata=({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
          });
          var data=await userModel.create(mybodydata);
            console.log("insertion data signup successfull" +data);
            // res.redirect('/login');
            //res.json({success:"success",data:data});
            res.send(JSON.stringify({'flag':1,'message':'User has been created'}));
        }
  }catch(err){
    console.log("error in insertion data signup" +err);
      res.send(JSON.stringify({'flag':0,'message':'error in API','err':err}));
  }
});

//login get method
router.get('/login', function(req, res, next) {
  res.render('login');
});

//api login start
router.post('/loginApi',async function (req, res, next) {
  try{
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.email;     
   const data=await userModel.findOne({$or:[
                                              {email: email },{phone: email }
                                           ]
    })
   console.log("Find One " + data);
   let db_name = data.name;
   let db_email = data.email;
   let db_password = data.password;
   let db_phone = data.phone;
    
    if((db_email == email && db_password == password) || (db_phone == phone && db_password == password)){
            //Token Key 32 Character
          var privateKey = "sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf"
          let params = {
              email : data.user_email,
              name: data.user_name,
              gender: data.user_gender,
              mobile: data.user_mobile,
              dob: data.user_dob
          }
          var token =  jwt.sign(params, privateKey); // , { expires_in: '500s' }
          console.log("Token is "  + token);
          res.cookie("token", token);
          console.log("Cookies: ");
          console.log(req.cookies);

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

//display UserList
router.get('/usersListApi',AuthJWT,async function (req, res, next) {
  try{
    let data=await  userModel.find().lean();
    // console.log(data);
    // res.render('usersList', { user_array: data });
    res.send(JSON.stringify({"flag":1,"message":"Data Listening","data":data}));
  }catch(err){
    console.log("Error in Fetch Data " + err);
    res.send(JSON.stringify({"flag":0,"message":"Error in Api","err":err}));
  }
});


module.exports = router;
