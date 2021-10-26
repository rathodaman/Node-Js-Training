var express = require('express');
var router = express.Router();
//const {fetch }= require('node-fetch');
var UserModel=require('../schema/api-fetch-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/demo', function(req, res, next) {
// fetch('https://google.com')
//     .then(res => res.text())
//     .then(text => console.log(text))
// });

router.get('/add', function(req, res, next) {
  res.render('add',);
});

router.post('/add', function(req, res, next) {
  const mybodydata=({
    name: req.body.name,
    mobile:req.body.mobile,
    address:req.body.address,
  });
  var data=UserModel(mybodydata);  
  data.save(function(err){
    if(err){
      //console.log("error in insertion data" +err);
       res.send(JSON.stringify({'flag':0,'message':'error in api signup','err':err}));
      
    }
    else{
      //console.log("insertion data signup successfull" +data);          
      res.send(JSON.stringify({'flag':1,'message':'record added'}))
      // res.redirect('/add');
    }
  });
});

//Api for Display Data
router.get('/display',function(req, res, next) {
  UserModel.find({},function(err, data){
    if(err){
      res.send(JSON.stringify({'flag' : 0, 'message' : 'err in api', 'err': err}));
    }else{
      console.log("display data"+data);
      res.send(JSON.stringify({'flag' : 1, 'message' :'Data fetch Successfully','data' : data}));
    }
  })
});


module.exports = router;
