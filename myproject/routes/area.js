var express = require('express');
var router = express.Router();

//Call User Database Model
var AreaModel = require('../models/area-model');
var CityModel = require('../models/city-model');
var StateModel = require('../models/state-model');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/add', function(req, res, next) {
    CityModel.find(function(err, db_subcategory_array) {
        if (err) {
            console.log("Error in Fetch Data subcategory" + err);
          } else {
            //Print Data in Console
            console.log("successfully show data"+db_subcategory_array);
            StateModel.find(function(err, db_category_array) {
                if (err) {
                    console.log("Error in Fetch Data category " + err);
                  } else {
                    //Print Data in Console
                    console.log("category show successfully"+db_category_array);
                    res.render('admin/area/add',{city_array : db_subcategory_array,state_array : db_category_array}); 
                  }
              });
          }
      });
});

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
    //Create an Array 
    const mybodydata = {
        area_name : req.body.name,
        _state : req.body._state,
        _city : req.body._city
  }
  var data = AreaModel(mybodydata);
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.redirect('/admin/area/add');
      }
  })
});
 
//display category
router.get('/display', function(req, res, next) {
    AreaModel.find(function(err, db_subcategory_array){
        console.log(db_subcategory_array);

        if(err) res.json({message: 'There are no posts here.'});

        AreaModel.find({})
        .populate('_state _city')
      
          .exec(function(err, db_subcategory_array) {

            console.log(db_subcategory_array);
         
            res.render("admin/area/display", { area_array: db_subcategory_array });
          })
      });
 
});

// //Get Single User category show By ID
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
    AreaModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('/admin/area/display');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/admin/area/display');
      }
  });
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    AreaModel.findById(req.params.id, function(err, db_category_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_category_array);
  
            res.render('admin/area/edit', { editdata: db_category_array });
        }
    });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
        area_name : req.body.name,
        _state : req.body._state,
        _city : req.body._city
    }
    AreaModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/admin/area/display');
        } else {
          // res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
             res.redirect('/admin/area/display');
        }
    });
  });
  


module.exports = router;
