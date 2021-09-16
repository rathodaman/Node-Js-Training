var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node Js' });
});

router.get('/about', function(req, res, next) {
  res.send("main about page");
});

router.get('/contact', function(req, res, next) {
  res.send("main contact page");
});
module.exports = router;
