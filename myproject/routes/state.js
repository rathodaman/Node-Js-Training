var express = require('express');
var router = express.Router();

//Call User Database Model
var StateModel = require('../models/state-model');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/add', function(req, res, next) {
    res.render('admin/state/add');
});

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      state_name: req.body.state_name
  }
  var data = StateModel(mybodydata);
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.render('admin/state/add');
          //res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
      }
  })
});
 
//display category
router.get('/display', function(req, res, next) {
    StateModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('admin/state/display',{ statedata : db_users_array });  
      }
  });
 
});

//Get Single User category show By ID
// router.get('/show/:id', function(req, res) {
//     console.log(req.params.id);
//     CategoryModel.findById(req.params.id, function(err, db_categor_array) {
//         if (err) {
//             console.log("Error in Single Record Fetch" + err);
//         } else {
//             console.log(db_categor_array);
//             res.render('category/single-category-record', { category_array: db_categor_array });
//         }
//     });
// });

//Delete User By ID
router.get('/delete/:id', function(req, res) {
    StateModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('/state/display');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/admin/state/display');
      }
  });
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    StateModel.findById(req.params.id, function(err, db_category_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log("hello aman"+db_category_array);
  
            res.render('admin/state/edit', { editdata: db_category_array });
        }
    });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
      state_name: req.body.state_name 
    }
    StateModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/state/display');
        } else {
          // res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
             res.redirect('/admin/state/display');
        }
    });
  });
  


module.exports = router;
