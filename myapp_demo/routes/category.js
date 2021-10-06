var express = require('express');
var router = express.Router();
var usermodel=require("../model/category_model")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('category/index');
  });

router.get('/add', function(req, res, next) {
  res.render('category/add');
});

router.post('/add', function(req, res, next) {
 const mybodydata={
  category_name:req.body.name
 }
 const data=usermodel(mybodydata);
 data.save(function(err){
   if(err){
     console.log("error in adding category"+err);
   }
   else{
    console.log("category added");
    res.render('category/add');
   }
 })
});

router.get('/display', function(req, res, next) {
  usermodel.find(function(err,data){
    if(err){
      console.log("error in display category");
    }
    else{
      console.log("category display");
      res.render('category/display',{category_array:data});
    }
  })
});

router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  usermodel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in delete category"+err);
    }
    else{
      console.log("record deleted"+data);
      res.redirect('/category/display');
    }
  })
});

router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  usermodel.findById(editid,function(err,data){
    if(err){
      console.log("error in Edit category"+err);
    }
    else{
      console.log("category Update"+data);
      res.render('category/edit',{editdata:data});
    }
  })
});

router.post('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  const mybodydata={
    category_name:req.body.name
  }
  usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("error in Edit"+err);
    }
    else{
      console.log("category Update"+data);
      res.redirect('/category/display');
    }
  });
});

module.exports = router;
