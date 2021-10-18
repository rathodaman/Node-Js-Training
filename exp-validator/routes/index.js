var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/form',[
  check('email', 'Email length should be 10 to 30 characters')
    .isEmail().isLength({ min: 10, max: 30 }),
  check('name', 'Name length should be 4 to 20 characters')
    .isLength({ min: 4, max: 20 }),
  check('mobile', 'Mobile number should contains 10 digits')
    .isLength({ min: 10, max: 10 }),
  check('password', 'Password length should be 5 to 10 characters')
    .isLength({ min: 5, max: 10 })
], function(req, res, next) {
  const errors = validationResult(req).array();
      if (errors) {
        req.session.errors=errors;
        req.session.success = false;
        res.redirect('/form');
      }
      else {
        req.session.success = true;
          res.send("Successfully validated")
      }
});

router.get('/form', function(req, res, next) {
  res.render('form', {success: req.session.success,errors: req.session.errors});
  req.session.errors = null;
});


module.exports = router;
