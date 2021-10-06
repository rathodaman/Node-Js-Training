var express = require('express');
var router = express.Router();
var usermodel=require("../model/admin_model")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
  });
router.get('/add', function(req, res, next) {
  res.render('admin/add');
});

router.post('/add', function(req, res, next) {
 const mybodydata={
   admin_name:req.body.name,
   admin_email:req.body.email,
   admin_pass:req.body.pass
 }
 const data=usermodel(mybodydata);
 data.save(function(err){
   if(err){
     console.log("error in adding"+err);
   }
   else{
    console.log("data added");
    res.render('admin/add');
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
      res.render('admin/display',{user_array:data});
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
      res.redirect('/admin/display');
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
      res.render('admin/edit',{editdata:data});
    }
  })
});

router.post('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  const mybodydata={
    admin_name:req.body.name,
   admin_email:req.body.email,
   admin_pass:req.body.pass
  }
  usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("error in Edit"+err);
    }
    else{
      console.log("record Update"+data);
      res.redirect('/admin/display');
    }
  });
});

module.exports = router;
