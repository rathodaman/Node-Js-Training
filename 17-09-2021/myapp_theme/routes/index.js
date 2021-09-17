var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login Page' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup Page' });
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  var name=req.body.name;
  var father_name=req.body.father_name;
  var address=req.body.address;
  var gender=req.body.gender;
  var state=req.body.state;
  var city=req.body.city;
  var birth_date=req.body.birth_date;
  var pincode=req.body.pincode;
  var course=req.body.course;
  var email=req.body.email;
 
  res.render('showSignup', {name:name,father_name:father_name,address:address,gender:gender,state:state,city:city,birth_date:birth_date,pincode:pincode,course:course,email:email});
  //res.render('showSignup', { title: 'Signup Page' });
});

module.exports = router;
