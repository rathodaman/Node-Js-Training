var express = require('express');
var router = express.Router();

//Call User Database Model
var SubCategoryModel = require('../models/subcategory-model');
var CategoryModel = require('../models/category-model');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//Add Subcategory by get method
router.get('/add', function(req, res, next) {
    CategoryModel.find(function(err, db_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_category_array);
            //Render User Array in HTML Table
            res.render('admin/subcategory/add',{category_array : db_category_array}); 
          }
      });
  //res.render('add-category');
});

//Add Sub Category using Post Method 
router.post('/add', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      subcategory_name: req.body.subcategory_name,
      _category: req.body._category
      }
   
      console.log("Name is "  + req.body.sub_category_name);
      console.log("ID is "  + req.body._category); 
  var data = SubCategoryModel(mybodydata);
   
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.redirect('/subcategory/add');
      }
  })
});

//display sub category data
router.get('/display', function(req, res, next) {
   SubCategoryModel.find(function(err, db_subcategory_array){
        console.log(db_subcategory_array);

        if(err) res.json({message: 'There are no posts here.'});

        SubCategoryModel.find({})
        .populate('_category')
      
          .exec(function(err, db_subcategory_array) {

            console.log(db_subcategory_array);
         
            res.render("admin/subcategory/display", { subcategory_array: db_subcategory_array });
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
    SubCategoryModel.findByIdAndDelete(req.params.id, function(err, project) {
        if (err) {
          console.log("Error in Record Delete " + err);
            res.redirect('/admin/subcategory/display');
        } else {
  
          console.log(" Record Deleted ");
            res.redirect('/admin/subcategory/display');
        }
    });
});
  
//Get Single User for Edit Record by sub category
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    SubCategoryModel.findById(req.params.id, function(err, db_subcategory_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            CategoryModel.find({},function(err, db_category_array){
                res.render('admin/subcategory/edit',{subcategory_array: db_subcategory_array,category_array: db_category_array});
            });
            // console.log(db_subcategory_array);
        }
    });
});

//Update Sub Category Record Using Post Method
router.post('/edit/:id', function(req, res) {
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
      subcategory_name: req.body.subcategory_name,
      _category: req.body._category
    }
    SubCategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/admin/subcategory/display');
        } else {
            res.redirect('/admin/subcategory/display');
        }
    });
  });  
  


module.exports = router;