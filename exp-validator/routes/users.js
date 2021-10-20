var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/form', function(req, res, next) {
  res.render('form');
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
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
          res.json(errors)
      }
      else {
        res.status(200).json({
          success: true,
          message: 'Login successful',
      })
      }
});


module.exports = router;
