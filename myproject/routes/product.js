var express = require('express');
var router = express.Router();

//Call User Database Model
var ProductModel = require('../models/product-model');
var SubCategoryModel = require('../models/subcategory-model');
var CategoryModel = require('../models/category-model');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/add', function(req, res, next) {
    SubCategoryModel.find(function(err, db_subcategory_array) {
        if (err) {
            console.log("Error in Fetch Data subcategory" + err);
          } else {
            //Print Data in Console
            console.log("successfully show data"+db_subcategory_array);
            CategoryModel.find(function(err, db_category_array) {
                if (err) {
                    console.log("Error in Fetch Data category " + err);
                  } else {
                    //Print Data in Console
                    console.log("category show successfully"+db_category_array);
                    res.render('admin/product/add',{subcategory_array : db_subcategory_array,category_array : db_category_array}); 
                  }
              });
          }
      });
});

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
    var fileobj=req.files.image
    var filename=req.files.image.name
    console.log(req.files.image);

    //Create an Array 
    const mybodydata = {
        product_name : req.body.name,
        product_price : req.body.price,
        product_details : req.body.details,
        product_image : filename,
        _category : req.body._category,
        _subcategory : req.body._subcategory
  }
  var data = ProductModel(mybodydata);
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
        fileobj.mv("public/upload/"+filename,function(err){
            if(err)
            return res.status(500).send(err);
            console.log("file uploaded");  
          });
          res.render('admin/product/add');
      }
  })
});
 
//display category
router.get('/display', function(req, res, next) {
    ProductModel.find(function(err, db_subcategory_array){
        console.log(db_subcategory_array);

        if(err) res.json({message: 'There are no posts here.'});

        ProductModel.find({})
        .populate('_category _subcategory')
      
          .exec(function(err, db_subcategory_array) {

            console.log(db_subcategory_array);
         
            res.render("admin/product/display", { product_array: db_subcategory_array });
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
    ProductModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('/product/display');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/product/display');
      }
  });
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    ProductModel.findById(req.params.id, function(err, db_category_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_category_array);
  
            res.render('admin/product/edit', { editdata: db_category_array });
        }
    });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
    console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
        product_name : req.body.name,
        product_price : req.body.price,
        product_details : req.body.details,
        product_image : filename,
        _category : req.body._category,
        _subcategory : req.body._subcategory
    }
    ProductModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/product/display');
        } else {
          // res.send(JSON.stringify({ "flag": 1, "name": "success" })) ;
             res.redirect('/product/display');
        }
    });
  });
  


module.exports = router;
