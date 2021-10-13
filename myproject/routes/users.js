var express = require('express');
var router = express.Router();

var UsersModel = require('../models/user-model');
var AreaModel = require('../models/area-model');
const userModel = require('../models/user-model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
  AreaModel.find(function(err, db_category_array) {
      if (err) {
          console.log("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(db_category_array);
          //Render User Array in HTML Table
          res.render('admin/user/add',{area_array : db_category_array}); 
        }
    });
//res.render('add-category');
});

//Add Sub Category using Post Method 
router.post('/add', function(req, res, next) {
  var fileobj=req.files.user_photo
  var filename=req.files.user_photo.name
  console.log(req.files.user_photo);
  //Create an Array 
  const mybodydata = {
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_gender: req.body.user_gender,
    user_address: req.body.user_address,
    _area: req.body._area,
    user_photo: filename
    }
var data = UsersModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
      fileobj.mv("public/user images/"+filename,function(err){
        if(err)
        return res.status(500).send(err);
        console.log("file uploaded");  
      })
      console.log("data added");
        res.redirect('/users/add');
    }
})
});

//display User
router.get('/display', function(req, res, next) {
  UsersModel.find(function(err, db_subcategory_array){
      console.log("my data fatched before"+db_subcategory_array);

      if(err) res.json({message: 'There are no posts here.'});

      UsersModel.find({})
      .populate('_area')
    
        .exec(function(err, db_subcategory_array) {

          console.log("my data fatched after"+db_subcategory_array);
       
          res.render("admin/user/display", { user_array: db_subcategory_array });
        })
    });

});

//Delete User By ID
router.get('/delete/:id', function(req, res) {
  UsersModel.findByIdAndDelete(req.params.id, function(err, project) {
    if (err) {
      console.log("Error in Record Delete " + err);
        res.redirect('/users/display');
    } else {
      console.log(" Record Deleted ");
        res.redirect('/users/display');
    }
});
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    UsersModel.findById(req.params.id, function(err, db_category_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_category_array);
  
            res.render('admin/user/edit', { editdata: db_category_array });
        }
    });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
  var fileobj=req.files.user_photo
  var filename=req.files.user_photo.name
  console.log(req.files.user_photo);
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_password: req.body.user_password,
      user_gender: req.body.user_gender,
      user_address: req.body.user_address,
      _area: req.body._area,
      user_photo: filename
    }
    userModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/users/display');
        } else {
          // res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
             res.redirect('/users/display');
        }
    });
  });
  





module.exports = router;
