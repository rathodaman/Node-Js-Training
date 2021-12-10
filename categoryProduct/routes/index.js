var express = require('express');
var router = express.Router();
const categoryModel=require('../schema/categorySchema');
const productModel=require('../schema/productSchema');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//add category get method
router.get('/addCategory', function(req, res, next) {
  res.render('addCategory');
});

//add category post method
router.post('/addCategory',async function(req, res, next) {
  try{
    const mybodydata = {
      categoryName: req.body.category
    }
  var data =await categoryModel.create(mybodydata);
  res.render('addCategory');
  }catch(err){
    console.log(err);
  }
});

//display category
router.get('/displayCategory',async function(req, res, next) {
  try{
    let data =await categoryModel.find().lean()
    res.render('displayCategory',{categorydata:data}); 
  }catch(err){
    console.log(err);
  }
});

//add product get method
router.get('/addProduct',async function(req, res, next) {
  try{
    let data=await categoryModel.find().lean();
    res.render('addProduct',{ categorydata : data }); 
  }catch(err){
    console.log(err);
  }
});

//add product post method
router.post('/addProduct',async function(req, res, next) {
  try{
    const mybodydata = {
      productName: req.body.product,
      _category:req.body._category
    }
    let data =await productModel.create(mybodydata);
    res.redirect('addProduct');
  }catch(err){
    console.log(err);
  }
});

//display Product data
router.get('/displayProduct',async function(req, res, next) {
    try{
      await productModel.find();
      let data=await productModel.find({}).populate('_category').exec()
      res.render("displayProduct", { product_array: data });
    }catch(err){
      console.log(err);
    }   
});

module.exports = router;
