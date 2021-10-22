var express = require('express');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');
var UserModel=require('../schema/form');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form', function(req, res, next) {
  res.render('form', {success: req.session.success,errors: req.session.errors});
  req.session.errors = null;
});

router.post('/form-process',
[
  check('email')
  .notEmpty().withMessage('Email is Required').trim().escape().normalizeEmail()
    .isLength({ min: 10, max: 30 }).withMessage('Email length should be 10 to 30 characters')
    .isEmail().withMessage('Please enter a valid email address')
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        UserModel.findOne({email:req.body.email}, function(err, data){
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
  check('name')
  .notEmpty().withMessage('Name is Required').trim().escape()
    .isLength({ min: 4, max: 20 }).withMessage('Name length should be 4 to 20 characters'),
  check('mobile', 'Mobile number should contains 10 digits')
  .notEmpty().withMessage('Mobile No is Required')
    .isLength({ min: 10, max: 10 }),
  check('password')
  .not().isEmpty().withMessage('password is required') .trim()
   .isStrongPassword({
      minlength:8,
      minLowercase:1,
      maxLowercase:1,
      minNumbers:1
   }),
  // .isLength({min: 8}).withMessage('Password length at least 8 characters')
  // .isLength({max: 20}).withMessage('Password length maximum at most 20 characters')
  // .isLowercase({min:1}).withMessage('password should contain lowercase'),
  // .isUppercase({minUppercase:1}).withMessage('password should contain uppercase')
  // .isNumber({minNumbers:1}).withMessage('password should contain an Number'),
  //let s=password.split('')
  // throw new Error('password should contain uppercase');
  // throw new Error('password should contain lowercase'); 
  // throw new Error('password should contain a Number');
  // .custom((value, { req }) => {
  // //function solution(s) {
  //   let s=password.split('') 
  // var c = s[0];
    
  //   if (c == c.toUpperCase() && !(c >= '0' && c <= '9') &&(c >='A' && c <= 'Z')) {
  //     throw new Error('password should contain uppercase');
  //       //return 'upper';
  //   } else if (c == c.toLowerCase() && !(c >= '0' && c <= '9') &&(c >='a' && c <= 'z')){
  //     throw new Error('password should contain lowercase');   
  //     //return 'lower';
  //   } else if (c >= '0' && c <= '9'){
  //     throw new Error('password should contain a Number');
  //      //return 'digit'
  //   } else {
  //     return true; 
  //   }
  //   }), 
  check('cpassword')
  .not().isEmpty().withMessage('confirm password is required').trim().escape()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm Password does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  check('aadhar').not().isEmpty().withMessage('Aadhar No. is required')
    .matches('^[2-9]{1}[0-9]{11}$').withMessage("Invalid Aadhar number"),
  check('pan').not().isEmpty().withMessage('Pancard No. is required')
    .matches('[A-Z]{5}[0-9]{4}[A-Z]{1}').withMessage("Invalid Pancard number"),
  check('passport').not().isEmpty().withMessage('Passport No. is required')
    .matches('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$').withMessage("Invalid Passport number"),
  check('gst').not().isEmpty().withMessage('GST No. is required')
    .matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$').withMessage("Invalid GST number"),
  check('indianNo').not().isEmpty().withMessage('indian Mobile No. is required')
    .matches('^[+91]{3}[6-9]{1}[0-9]{9}$').withMessage("Invalid Indian Mob. Number"),
 
], function(req, res, next) {

  const errors = validationResult(req).mapped();
  console.log(errors);
  console.log(req.body);
  console.log(req.body.name);
      if(Object.keys(errors).length){
        let data=req.body;
        //   req.session.errors=errors;
        //  req.session.success = false;
        //  res.render('form', {errors: errors,data:req.body});
        return res.send(errors,data);
        //res.redirect('/form');
      }
    else{
      console.log("else");
            req.session.success = true;
            
            const mybodydata=({
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile,
              password: req.body.password,
              cpassword: req.body.cpassword,
              aadhar: req.body.aadhar,
              pan: req.body.pan,
              passport: req.body.passport,
              gst: req.body.gst,
              indianNo: req.body.indianNo, 
            });
            var data=UserModel(mybodydata);  
            data.save(function(err){
              if(err){
                console.log("error in insertion data signup" +err);
                return  res.send(JSON.stringify({'flag':0,'message':'error in api signup','err':err}));
                
              }
              else{
                console.log("insertion data signup successfull" +data);          
               return res.send(JSON.stringify({'flag':1,'message':'record added'}))
                // res.redirect('/login');
              }
            });
            console.log("hello aman");
            //res.send(JSON.stringify({'flag':1,'message':'record added'}))
     res.send("Successfully validated");
      }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {

  res.render('login');
});

module.exports = router;
