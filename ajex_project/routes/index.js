var express = require('express');
var router = express.Router();
const UserModel= require('../schema/form-schema')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/form', function(req, res, next) {
  UserModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('form',{ userdata : db_users_array });  
      }
  }).lean()
});

/* User Registration page */
router.post('/form', function(req, res, next) {
  var fileobj=req.files.image
  var filename=req.files.image.name
  console.log(req.files.image);
  const mybodydata = {
    firstName : req.body.fname,
    LastName : req.body.lname,
    interest : req.body.interest,
    gender : req.body.gender,
    hobby : req.body.hobby,
    address : req.body.address,
    image : filename
}
var data = UserModel(mybodydata);
data.save(function(err){
    if(err){
        console.log("Error in Insert user"+err);
    }else{
      fileobj.mv("public/images/"+filename,function(err){
        if(err)
        return res.status(500).send(err);
        console.log("file uploaded");  
      });
        console.log("user Insert Successfully"+ data);
            //res.send('successfull'); 
            res.json(data);   
    }
})
});

//replace code
router.get('/users', function(req, res, next) {
  UserModel.find(function(err, db_users_array) {
  if (err) {
      console.log("Error in Fetch Data " + err);
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('partials/table',{ userdata : db_users_array });  
    }
}).lean()
});

//delete using ajax
router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in Delete user"+err)
    }
    else{
      console.log("user data Deleted"+data);
     res.redirect('/form');
    }
  });
});

//update using ajax
router.get('/:id', function(req, res, next) {
  var editid=req.params.id;
  UserModel.findById(editid,function(err,data){
    if(err){
      console.log("error in update" + err);
    }
    else{
      console.log("admin Data updated Successfully" + data);
      res.json({data:data});
    }
  })
 });

//display Users Details
router.get('/display', function(req, res, next) {
  UserModel.find(function(err, db_users_array) {
  if (err) {
      console.log("Error in Fetch Data " + err);
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('display',{ userdata : db_users_array });  
    }
}).lean()
});

router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in Delete user"+err)
    }
    else{
      console.log("user data Deleted"+data);
     res.redirect('/display');
    }
  });
});

router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  UserModel.findById(editid,function(err,data){
    if(err){
      console.log("error in update" + err);
    }
    else{
      console.log("admin Data updated Successfully" + data);
      res.render('edit',{editdata:data});
    }
  })
 });

 router.post('/edit/:id', function(req, res, next) {
  var fileobj=req.files.image
  var filename=req.files.image.name
  console.log(req.files.image);

  var editid=req.params.id;
  const mybodydata={
    firstName : req.body.fname,
    LastName : req.body.lname,
    interest : req.body.interest,
    gender : req.body.gender,
    hobby : req.body.hobby,
    address : req.body.address,
    image : filename
  }
  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("error in update user data"+err);
    }
    else{
      fileobj.mv("public/images/"+filename,function(err){
        if(err)
        return res.status(500).send(err);
        console.log("file uploaded");  
      });
      console.log("user data updated"+data);
     res.redirect('/display');
    }
  });
});

module.exports = router;
