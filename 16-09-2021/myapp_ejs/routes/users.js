var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users main page');
});
router.get('/about', function(req, res, next) {
  res.send('Users About Page');
});
router.get('/contact', function(req, res, next) {
  res.send('Users Contact Page');
});

router.get('/login', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('login',{title :'Login Page'});
});

module.exports = router;
