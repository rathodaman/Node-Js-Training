var express = require('express');
var router = express.Router();
//load model
var Usermodel=require('../model/users_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add-process', function(req, res, next) {
  //console.log(req.body);
  const mybodydata={
    user_name :req.body.text1,
    user_mobile  :req.body.text2
  }
  var data=Usermodel(mybodydata);
  data.save(function(err){
    if(err){
      console.log("error in insert");
    }
    else{
      console.log("record added");
      res.render('add');
    }
  })
});

router.get('/display', function(req, res, next) {
 Usermodel.find(function(err,db_user_data){
  if(err){
    console.log("error in fetch data" + err);
  }
  else{
    //console.log("fetch data " +db_user_data);
    res.render('display',{user_array:db_user_data});
  }
 });
});

router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  Usermodel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("Error in Delete" + err);
    }
    else{
      console.log("Record Deleted");
      res.redirect('/display');
    }
  })
});

router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  Usermodel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err);
    }
    else{
     
    
      res.render('edit',{editdata:data});
    }
  })
});

router.post('/edit/:id', function(req, res, next) {
  var editid=req.params.id;

  const mybodydata={
    user_name :req.body.text1,
    user_mobile  :req.body.text2
  }
  console.log(mybodydata);
  Usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err);
    }
    else{
     
      console.log("Edited Record");
      res.redirect('/display');
    }
  });
});

module.exports = router;
