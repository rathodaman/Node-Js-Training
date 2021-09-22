var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/formdata', function(req, res, next) {
  var a=req.body.username;
  console.log(a);

  req.session.username = a;
  res.redirect('home',);
});

router.get('/home', function(req, res, next) {
  if(req.session.username){
    var user=req.session.username;
    res.render('home',{myuser:user});
  }
  else{
    res.render('login');
  }
});

router.get('/logout', function(req, res, next) {
  res.session.destroy(function (err){
    res.redirect('login');
  })
});

module.exports = router;
