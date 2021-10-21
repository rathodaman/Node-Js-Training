var express = require('express');
var router = express.Router();
var Usersmodel=require('../schema/user_table')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-form', function(req, res, next) {
  Usersmodel.find(function(err, db_users_array) {
      if (err) {
          console.log("Error in Fetch Data " + err);
        } 
        else 
        {
          //Print Data in Console
          console.log(db_users_array);    
          res.render('add-form',{ user_array : db_users_array });
        }
    });
});

//Add Form Processing using Post Method 
router.post('/add-form', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    user_name: req.body.user_name,
    user_mobile: req.body.user_mobile,
    user_id: req.body.user_id 
}
var data = Usersmodel(mybodydata);
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.redirect('add-form');
    }
  });
});

//display user data 
router.get('/display-user', function(req, res, next) {
  Usersmodel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('display-user', { user_array : db_users_array });
      }
  });
});


//Get Single User By ID Shows Details
router.get('/show/:id', function(req, res) {
  console.log("show id:"+ req.params.id);
  Usersmodel.findById(req.params.id, function(err, db_users_array) {
      if (err) {
          console.log("Error in Single Record Fetch for user" + err);
      } else {
          console.log(db_users_array);
          res.render('single-record-user', { user_array: db_users_array });
      }
  });
});



//Delete User By ID
router.get('/delete/:id', function(req, res) {
  Usersmodel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {

        console.log("Error in Record Delete " + err);
          res.redirect('/display-user');
      } else {

        console.log(" Record Deleted ");
          res.redirect('/display-user');
      }
  });
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id);
  Usersmodel.findById(req.params.id, function(err, db_users_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_users_array);
          res.render('edit-user', { user_array: db_users_array });
      }
  });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
  console.log("Edit ID is"+ req.params.id);
  const mybodydata = {
    user_name: req.body.user_name,
    user_mobile: req.body.user_mobile
  }
 Usersmodel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/display-user');
      } else {
        
          res.redirect('/display-user');
      }
  });
});


module.exports = router;
