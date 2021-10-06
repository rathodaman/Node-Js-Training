var express = require('express');
var router = express.Router();
var usermodel=require("../model/user_model")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
 const mybodydata={
  user_name:req.body.name,
  user_pass:req.body.pass,
  user_gender:req.body.gender,
  user_email:req.body.email,
  user_dob:req.body.dob,
  user_address:req.body.address,
  user_city:req.body.city
 }
 const data=usermodel(mybodydata);
 data.save(function(err){
   if(err){
     console.log("error in adding"+err);
   }
   else{
    console.log("data added");
    res.redirect('/');
   }
 })
});

router.get('/display', function(req, res, next) {
  usermodel.find(function(err,data){
    if(err){
      console.log("error in display data");
    }
    else{
      console.log("data display");
      res.render('display',{admin_array:data});
    }
  })
});

router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  usermodel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in delete"+err);
    }
    else{
      console.log("record deleted"+data);
      res.redirect('/display');
    }
  })
});

router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  usermodel.findById(editid,function(err,data){
    if(err){
      console.log("error in Edit"+err);
    }
    else{
      console.log("record Update"+data);
      res.render('edit',{editdata:data});
    }
  })
});

router.post('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  const mybodydata={
    user_name:req.body.name,
    user_pass:req.body.pass,
    user_gender:req.body.gender,
    user_email:req.body.email,
    user_dob:req.body.dob,
    user_address:req.body.address,
    user_city:req.body.city
  }
  usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("error in Edit"+err);
    }
    else{
      console.log("record Update"+data);
      res.redirect('/display');
    }
  });
});

module.exports = router;
