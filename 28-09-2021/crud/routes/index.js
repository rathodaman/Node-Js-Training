var express = require('express');
var router = express.Router();
var usermodel=require('../model/user_model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/form-process', function(req, res, next) {
 const mybodydata={
   user_name:req.body.text,
   user_mobile:req.body.mob,
 }
 var data=usermodel(mybodydata);
 data.save(function(err){
   if(err){
     console.log("error in insert");
   }
   else{
     console.log("data inserted");
     res.redirect('add');
   }
 })
});

router.get('/display', function(req, res, next) {
 usermodel.find(function(err,data){
   if(err){
     console.log("error in fetch data");
   }
   else{
    console.log("data fetch sucessfully");
    res.render('display',{user_array:data});
   }
 })
});

router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  usermodel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in Delete"+err)
    }
    else{
      console.log("data Deleted"+data);
     res.redirect('/display');
    }
  });
});

router.get('/edit/:id', function(req, res, next) {
 var editid=req.params.id;
 usermodel.findById(editid,function(err,data){
   if(err){
     console.log("error in update" + err);
   }
   else{
     console.log("Data updated Successfully" + data);
     res.render('edit',{editdata:data});
   }
 })
});

router.post('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  const mybodydata={
    user_name:req.body.text,
    user_mobile:req.body.mob
  }
  usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("error in update"+err);
    }
    else{
      console.log("data updated"+data);
     res.redirect('/display');
    }
  });
});

module.exports = router;
