var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Page' });
});

router.get('/education', function(req, res, next) {
  res.render('education', { title: 'Education Page' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Page' });
});



module.exports = router;
