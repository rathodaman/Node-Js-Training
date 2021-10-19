var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
  check('email', 'Email length should be 10 to 30 characters')
    .isEmail().isLength({ min: 10, max: 30 }),
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
  //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  check('aadhar').matches('^[2-9]{1}[0-9]{11}$').withMessage("Invalid Aadhar number"),
  check('pan').matches('[A-Z]{5}[0-9]{4}[A-Z]{1}').withMessage("Invalid Pancard number"),
  check('passport').matches('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$').withMessage("Invalid Passport number"),
  check('gst').matches('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$').withMessage("Invalid GST number"),
    // check('aadhar','Aadhar number should contains 12 digits')
    // .isValidNumber('aadhar'),
    // validator.isValidNumber('aadhar')
], function(req, res, next) {
  const errors = validationResult(req).mapped();
      if(errors){
         req.session.errors=errors;
         req.session.success = false;
         res.render('form', {errors: errors});
        //res.redirect('/form');
      }
      else {
        req.session.success = true;
          res.send("Successfully validated")
      }
});




module.exports = router;
