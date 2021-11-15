const express = require('express');
const router = express.Router();
const UsersModel=require('../model/users');
/* GET home page. */
router.get('/', function(req, res, next) {
  UsersModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('index', { mydata: data });
    }
  }).lean();
 
});

router.post('/', function (req, res, next) {
  const myfile = req.files.image;
  const myfilename = req.files.image.name;
  myfile.mv('public/images/'+myfilename, function(err) {
    if (err)
    throw err;
    //res.send('File uploaded!'); 
    });
  

  //Create an Array 
  const mybodydata = {
    name: req.body.name,
    gender: req.body.gender,
    city: req.body.city,
    address: req.body.address,
    image:myfilename,
    hobbies:req.body.hobbies
    

  }
  const data = UsersModel(mybodydata);

  data.save(function (err,data) {
    if (err) {
      res.json({msg:"err"})
      console.log("Error in Insert Record" + err);
    } else {
      console.log("Data Inserted")
      console.log(data)
      res.json({msg:"success",mydata:data})
    }
  })

});
router.get('/:id', function(req, res, next) {
   UsersModel.findById(req.params.id,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);  
   res.json(data)
    }
  }).lean();

});
router.delete('/:id', function(req, res, next) {
  var deleteid = req.params.id;
  UsersModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.json({msg:"Data Remove Successfully"})
    }
  })
  
});
router.put('/:id', function(req, res, next) {
  console.log("req.body")
  console.log(req.body)
  var editid = req.params.id;
  const mybodydata = {
    name: req.body.name,
    gender: req.body.gender,
    city: req.body.city,
    address: req.body.address,
    hobbies:req.body.hobbies
  }
  if(req.files && req.files.image){
  var myfile = req.files.image;
var myfilename = req.files.image.name;
myfile.mv('public/images/'+myfilename, function(err) {
  if (err)
  throw err;
  //res.send('File uploaded!');
  });
  mybodydata.image = myfilename;
}

  UsersModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

    }
  }).lean();
  
  res.send(mybodydata)
});

module.exports = router;