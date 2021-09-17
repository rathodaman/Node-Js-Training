var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form', function(req, res, next) {
  //res.send("hello aman kese ho")
   res.render('form', { title: 'Express' });
});

router.post('/form', function(req, res, next) {
  //get data from form
  console.log(req.body);
  var a=req.body.email;
  var b=req.body.password;
  console.log(a,b);
  res.render('show', {email:a,password:b});
});


module.exports = router;
