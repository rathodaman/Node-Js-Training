var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome Students To Our Main Page of students");
});

router.get('/about', function(req, res, next) {
  res.send("We all are Students to Students About Page");
});

router.get('/contact', function(req, res, next) {
  res.send("Students Contact Page");
});
module.exports = router;
