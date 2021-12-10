var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { abc1: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', {abc :'akash'});
});
router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/form-process', function(req, res, next) {
  var fileobject = req.files.file123;
  var filename = req.files.file123.name;
  fileobject.mv("public/upload/"+filename,function(err){
    if(err) throw err;
    res.send("File Uploaded");
  });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login-process', function(req, res, next) {
  //Get Value From Textbox
  var a = req.body.txt1;
  //Session Variable Create
  req.session.username = a;
  //Cookie Create
  res.cookie('username',a,{expire : new Date() + 100,httpOnly:true});
  //Check
  console.log( "Sesion Value in Login Process " +  req.session.username);
  //Redirect
  res.redirect('/home');
  
});

router.get('/home', function(req, res, next) {
  //Check Session Variable 
  console.log( "Sesion Value in Home" +  req.session.username);
  if(req.session.username){
    //Get Value from Session
    var user = req.session.username;
    //Render Page with Username
    res.render('home',{myuser:user});
    console.log(req.cookies);
  }else{
    //res.send("<h1>Login Required</h1>");
    res.redirect('/login');
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    res.clearCookie('username');
    res.redirect('/login');
  });
});
module.exports = router;
