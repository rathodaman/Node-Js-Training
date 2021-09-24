var express = require('express');
const { findByIdAndDelete } = require('../model/user_model');
var router = express.Router();
var Usermodel=require('../model/user_model')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add-process', function(req, res, next) {
  var mybodydata={
    user_name:req.body.text1,
    user_mobile:req.body.text2,
  }
  var data=Usermodel(mybodydata);
  data.save(function(err){
    if(err){
      console.log("error in insert");
    }
    else{
      console.log("record added");
      res.redirect('display');
    }
  })
});

router.get('/display', function(req, res, next) {
  Usermodel.find(function(err,data){
    if(err){
      console.log("error in fatch data");
    }
    else{
      console.log("fatch data");
      res.render('display',{user_array:data});
    }
  })
});

router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  Usermodel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in delete" + err);
    }
    else{
      console.log("data deleted");
      res.redirect('/display');
    }
  })
});

router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  Usermodel.findById(editid,function(err,data){
    if(err){
      console.log("error in edit" + err);
    }
    else{
      console.log("data edited" + data);
      res.render('edit',{editdata:data});
    }
  })
});

router.post('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  const mybodydata={
    user_name:req.body.text1,
    user_mobile:req.body.text2
  }
  Usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("error in Update" + err);
    }
    else{
      console.log("Record Update");
      res.redirect('/display');
    }
  })
});

module.exports = router;
