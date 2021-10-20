var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var UserModel=require('../schema/form');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('jquery', { title: 'Express' });
});

router.get('/form', function(req, res, next) {
  // var success=req.session.success;
  // var errors=req.session.errors;
  // var name_error=errors.name.msg;
  // console.log("aman"+name_error);
  res.render('form', {success: req.session.success,errors: req.session.errors});
  req.session.errors = null;
});

router.post('/form',[
  check('email','Email is Required').isEmail().withMessage('Not Proper Email Formate')
    .isLength({ min: 15, max: 30 }).withMessage('Email length should be 10 to 30 characters'),
  check('name', 'Name length should be 4 to 20 characters')
    .isLength({ min: 4, max: 20 }),
  check('mobile', 'Mobile number should contains 10 digits')
    .isLength({ min: 10, max: 10 }),
  // check('password', 'Password length should be 5 to 10 characters')
  //   .isLength({ min: 5, max: 10 }),
  check("password", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long")
  .isStrongPassword({ minLength: 8,
    minLowercase:1,
    minUppercase:1,
    minNumbers:1}),
  check('aadhar').matches('^[2-9]{1}[0-9]{11}$').withMessage("Invalid Aadhar number"),
  check('pan').matches('[A-Z]{5}[0-9]{4}[A-Z]{1}').withMessage("Invalid Pancard number"),
  check('passport').matches('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$').withMessage("Invalid Passport number"),
  check('gst').matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$').withMessage("Invalid GST number"),
  check('indianNo').matches('^[+91]{3}[6-9]{1}[0-9]{9}$').withMessage("Invalid Indian Mob. Number"),
 
], function(req, res, next) {

  const errors = validationResult(req).mapped();
  console.log(errors);
      if(errors){
          req.session.errors=errors;
         req.session.success = false;
         res.render('form', {errors: errors});
        //res.redirect('/form');
      }
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         success: false,
    //         errors: errors.array()
    //         //console.log("aman"+errors)
    //     });
    //   }

    // res.status(200).json({
    //     success: true,
    //     message: 'Login successful',
    // })
    else{
            req.session.success = true;
            // const mybodydata=({
            //   name: req.body.name,
            //   email: req.body.email,
            //   mobile: req.body.mobile,
            //   password: req.body.password,
            //   aadhar: req.body.aadhar,
            //   pan: req.body.pan,
            //   passport: req.body.passport,
            //   gst: req.body.gst,
            //   indianNo: req.body.indianNo, 
            // });
            // var data=UserModel(mybodydata);  
            // data.save(function(err,data){
            //   if(err){
            //     console.log("error in insertion data signup" +err);
            //   }
            //   else{
            //     console.log("insertion data signup successfull" +data);
            //     res.redirect('/login');
            //   }
            // });
      res.send("Successfully validated")
      }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {

  res.render('login');
});

module.exports = router;
