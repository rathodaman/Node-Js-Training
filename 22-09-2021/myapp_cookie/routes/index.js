var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create-cookie',function(req, res){
  res.cookie('user' , 'aman');
  res.cookie('animal' , 'dog');
  res.cookie('color' , 'red', {maxAge: 10000});
  res.send('Cookie is set');
});

router.get('/get-cookie', function(req, res, next) {
    let cookie=JSON.stringify(req.cookies);
    
    res.send(cookie);
  });

router.get('/clear-cookie',function(req, res){
    res.clearCookie('user');
    res.clearCookie('animal');
    res.clearCookie('color');
    res.send('Cookie is deleted');
  });

router.get('/form', function(req, res, next) {
    res.render('form');
  });

router.post('/color_choosen', function(req, res, next) {
    var col=req.body.color1;
    res.cookie('cols',col)
    res.redirect('/home');  
  });  
  
  router.get('/home', function(req, res, next) {

    var b=req.cookies.cols;
    console.log(b);
    res.render('home',{colss:b});
    
  });

module.exports = router;
