var express = require('express');
var router = express.Router();

//Call User Database Model
var CityModel = require('../models/city-model');
var StateModel = require('../models/state-model');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//Add Subcategory by get method
router.get('/add', function(req, res, next) {
    StateModel.find(function(err, db_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_category_array);
            //Render User Array in HTML Table
            res.render('admin/city/add',{state_array : db_category_array}); 
          }
      });
  //res.render('add-category');
});

//Add Sub Category using Post Method 
router.post('/add', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      city_name: req.body.city_name,
      _state: req.body._state
      }
   
      console.log("Name is "  + req.body.city_name);
      console.log("ID is "  + req.body._state); 
  var data = CityModel(mybodydata);
   
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.redirect('/admin/city/add');
      }
  })
});

//display sub category data
router.get('/display', function(req, res, next) {
   CityModel.find(function(err, db_subcategory_array){
        console.log(db_subcategory_array);

        if(err) res.json({message: 'There are no posts here.'});

        CityModel.find({})
        .populate('_state')
      
          .exec(function(err, db_subcategory_array) {

            console.log(db_subcategory_array);
         
            res.render("admin/city/display", { city_array: db_subcategory_array });
          })
      });
   
});

//Get Single User By ID in sub category show
// router.get('/show/:id', function(req, res) {
//     console.log(req.params.id);
  
//     SubCategoryModel.findById(req.params.id, function(err, db_sucategory_array) {
  
  
//         if (err) {
//             console.log("Error in Single Record Fetch" + err);
//         } else {
  
          
//             console.log(db_sucategory_array);
  
//             res.render('subcategory/single-subcategory-record', { subcategory_array: db_sucategory_array });
//         }
//     });
//   });

//Delete User By ID
router.get('/delete/:id', function(req, res) {
    CityModel.findByIdAndDelete(req.params.id, function(err, project) {
        if (err) {
          console.log("Error in Record Delete " + err);
            res.redirect('/city/display');
        } else {
  
          console.log(" Record Deleted ");
            res.redirect('/admin/city/display');
        }
    });
});
  
//Get Single User for Edit Record by sub category
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    CityModel.findById(req.params.id, function(err, db_subcategory_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            StateModel.find({},function(err, db_category_array){
                console.log(db_subcategory_array);
            res.render('admin/city/edit',{city_array: db_subcategory_array,state_array:db_category_array});
            });
        }
    });
});

//Update Sub Category Record Using Post Method
router.post('/edit/:id', function(req, res) {
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
      city_name: req.body.city_name,
      _state: req.body._state
    }
    CityModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/admin/city/display');
        } else {
            res.redirect('/admin/city/display');
        }
    });
  });
  


module.exports = router;