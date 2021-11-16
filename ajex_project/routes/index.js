var express = require('express');
var router = express.Router();
const UserModel= require('../schema/form-schema')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/form',async function(req, res, next) {
  try {
        let data = await UserModel.find().lean();
        res.render('form',{ userdata : data });
  } catch (e) {
        console.log(e);
        res.json({status : "error"})
  }
});

/* User Registration page post */
router.post('/form', function(req, res, next) {
  try {
    var fileobj=req.files.image
    var filename=req.files.image.name
    console.log(req.files.image);
    fileobj.mv("public/images/"+filename,async function(err){
      if(err) throw err;
      console.log("file uploaded");
      const mybodydata = {
        firstName : req.body.fname,
        LastName : req.body.lname,
        interest : req.body.interest,
        gender : req.body.gender,
        hobby : req.body.hobby,
        address : req.body.address,
        image : filename
      }
      let data = await UserModel.create(mybodydata);
      res.json({status : "success", data:data});
    }) 
  } catch (error) {
      res.json({status:"error"});
  }
});

//replace code
router.get('/users',async function(req, res, next) {
  try {
        let condition = {};
        if(req.query.search){
          
          condition={$or: [
{firstName: req.query.search},{LastName: req.query.search},{address: req.query.search}
                    ]}
        }
        if(req.query.gender){
          condition.gender = req.query.gender;
        }
        let data = await UserModel.find(condition).lean();
        res.render('partials/table',{ userdata : data });
    } catch (e) {
        console.log(e);
        res.json({status : "error"})
    }
});

//delete using ajax
router.delete('/:id',async function(req, res, next) {
  try {
        var deleteid=req.params.id;
        let data = await UserModel.findByIdAndDelete(deleteid);
        res.json({status:"data remove successfully"});
  } catch (e) {
        console.log(e);
        res.json({status : "error"})
  }
});

//update using ajax GET
router.get('/edit/:id',async function(req, res, next) {
  try {
        var editid=req.params.id;
        let data = await UserModel.findById(editid).lean();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.json({status : "error"})
    }
});

//update using ajax PUT
router.put('/:id',async function(req, res, next) {
  try {
        var editid=req.params.id;
        const mybodydata={
          firstName : req.body.fname,
          LastName : req.body.lname,
          interest : req.body.interest,
          gender : req.body.gender,
          hobby : req.body.hobby,
          address : req.body.address
        }
        if(req.files && req.files.image){
          var fileobj = req.files.image;
          var filename = req.files.image.name;
          fileobj.mv('public/images/'+filename, function(err) {
            if(err) throw err;
            console.log("file uploaded");
          })
           mybodydata.image = filename;
        }
        let data = await UserModel.findByIdAndUpdate(editid,mybodydata);
        res.json({status : "success", data:data});
  } catch (e) {
        console.log(e);
        res.json({status : "error"})
  }
});

module.exports = router;
