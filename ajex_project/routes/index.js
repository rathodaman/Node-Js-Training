var express = require('express');
var router = express.Router();
const UserModel= require('../schema/form-schema');
var multer = require('multer');
var path = require('path');
const { Parser, json2csv } = require('json2csv');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
     //cb(null, Date.now() + file.originalname)
    cb(null, file.originalname)
  },
});
var upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
       // return res.json("Only images are allowed");
       console.log("aman images are allowed");
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024
  }
}).single('image')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/form',async function(req, res, next) {
  try {
  // For pagination
  let page = 1;
  let limit = 5;
  if (req.query.page) {
      page = req.query.page;
  }
  let skip = limit * (page - 1);

  //For Sorting
    val=1;
    let condition = {};
    let fieldname = 'firstName';
    if(req.query.fieldName){
      fieldname = req.query.fieldName;
      console.log(fieldname);
      if(req.query.order =="asc"){
        val=1;
      }
      if(req.query.order =="desc"){
        val=-1;
      }
    }

  // for Searching
        if(req.query.search){
          condition={$or: [
{firstName: new RegExp(req.query.search,'i')},{LastName: new RegExp(req.query.search,'i')},{address: new RegExp(req.query.search,'i')},{gender: new RegExp(req.query.search,'i')}
                    ]}       
        }
    
  // for Gender Dropdown Searching
    if(req.query.gender){
      condition.gender = req.query.gender;
    }
    
    let data = await UserModel.find(condition).lean().sort({[fieldname]:val}).skip(skip).limit(limit);
    let totalData = await UserModel.countDocuments(condition);
    res.render('form',{
      userdata : data,
      pagination: {
        page: page,
        totalPage: new Int8Array(Math.ceil(totalData / limit)).map((curr, index) => curr = index + 1),
        url: req.originalUrl
      }
    });
} catch (e) {
    console.log(e);
    res.json({status : "error"})
}
});

/* User Registration page post */
router.post('/form', function(req, res, next) {
  try {
    upload(req,res,async function(err){
      if(err){
        console.log("err");
        console.log(err);
        return res.json({
          msg : err.message,
          type: 'error'
        });
      }
  
    // var fileobj=req.files.image
    // var filename=req.files.image.name
    // console.log(req.files.image);
    //fileobj.mv("public/images/"+filename,async function(err){
      // if(err) throw err;
      // console.log("file uploaded");
      //console.log("req.file.filename");
     // console.log(req.file.filename);
      //console.log(filename);
      console.log("aman rathod");
      console.log(req.file.originalname);
      const mybodydata = {
        firstName : req.body.fname,
        LastName : req.body.lname,
        interest : req.body.interest,
        gender : req.body.gender,
        hobby : req.body.hobby,
        address : req.body.address,
        image: req.file.originalname
      }
     // mybodydata.image = filename;
      let data = await UserModel.create(mybodydata);
      console.log("status is ");
      res.json({
        type: 'success',
        msg :"Registration Success ", 
        data:data,
      });
     //res.json({data:data})
    })
    //}) 
  } catch (error) {
      console.log("in catch block");
     res.json({msg:"error",error:"new yerz"});
  }
});

//replace Users code
router.get('/users',async function(req, res, next) {
  try {
      // For pagination
      let page = 1;
      let limit = 5;
      if (req.query.page) {
          page = req.query.page;
          console.log(req.query.page);
      }
      let skip = limit * (page - 1);
      
      // For Sorting 
        val=1;
        let condition = {};
        let fieldname = 'firstName';
        if(req.query.fieldName){
          fieldname = req.query.fieldName;
          console.log(fieldname);
          if(req.query.order =="asc"){
            val=1;
          }
          if(req.query.order =="desc"){
            val=-1;
          }
        }

        // for Searching
        if(req.query.search){
          condition={$or: [
{firstName: new RegExp(req.query.search,'i')},{LastName: new RegExp(req.query.search,'i')},{address: new RegExp(req.query.search,'i')},{gender: new RegExp(req.query.search,'i')}
                    ]}       
        }
        
        // for Gender Dropdown Searching
        if(req.query.gender){
          condition.gender = req.query.gender;
        }
        // export data
        if(req.query.exportType == 'csv'){
          console.log(req.query.search);
          if(req.query.search){
            condition={$or: [
  {firstName: new RegExp(req.query.search,'i')},{LastName: new RegExp(req.query.search,'i')},{address: new RegExp(req.query.search,'i')},{gender: new RegExp(req.query.search,'i')}
                      ]}       
          }
          console.log("condition");
          console.log(condition);
          let data = await UserModel.find(condition).lean();
          //res.send({a:'a'})
            const fields = ['firstName','LastName','gender','address','image'];
            const opts = { fields };
            try {
              const parser = new Parser(opts);
              const csv = parser.parse(data);
              console.log(csv);
              console.log(json2csv);
              // csv = json2csv(numbers, opts);
              let fileName=`users-${Date.now()}.csv`
              console.log(fileName);
              res.setHeader('Content-disposition', 'attachment; filename='+fileName);
              res.set('Content-Type', 'text/csv');
              res.status(200).send(csv);
            } catch (err) {
              console.log(("aman"));
              console.error(err);
            }
        } else if(req.query.email){
          console.log("hello aman");
          console.log("condition");
          console.log(condition);
          let fileName=`users-${Date.now()}.csv`
          let data = await UserModel.find(condition).lean();
          //res.send({a:'a'})
            const fields = ['firstName','LastName','gender','address','image'];
            const opts = { fields };
            try {
              const parser = new Parser(opts);
              const csv = parser.parse(data);
              console.log(csv);
              console.log(json2csv);
              // csv = json2csv(numbers, opts);
        
              fs.writeFileSync(`public/csvFiles/${fileName}`,csv)
              console.log(fileName);
              res.setHeader('Content-disposition', 'attachment; filename='+fileName);
              res.set('Content-Type', 'text/csv');
              res.status(200).send(csv);
            } catch (err) {
              console.log(("aman"));
              console.error(err);
            }
           
          "use strict";
            const nodemailer = require("nodemailer");
            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
              // Generate test SMTP service account from ethereal.email
              // Only needed if you don't have a real mail account for testing
              let testAccount = await nodemailer.createTestAccount();
              console.log("aman kese ho");
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: "learningtesting2021@gmail.com", // generated ethereal user
                  pass: "Test@123", // generated ethereal password
                },
              });

              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: '"Aman Rathod 👻" <foo@example.com>', // sender address
                to: req.query.email, // list of receivers
                subject: "Hello ✔", // Subject line
                attachments: [
                    {
                      filename: fileName,
                      path: `public/csvFiles/${fileName}`,
                    }
                ],
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
              });
              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }

            main().catch(console.error);

        } else {
          // let data = await UserModel.find(condition).lean().sort({[fieldname]:val});
          let data = await UserModel.find(condition).lean().sort({[fieldname]:val}).skip(skip).limit(limit);
          let totalData = await UserModel.countDocuments(condition);
          console.log("totalData : - ")
          console.log(totalData)
          res.render('partials/table',{
            layout: 'blank', 
            userdata : data,
            pagination: {
              page: page,
              totalPage: new Int8Array(Math.ceil(totalData / limit)).map((curr, index) => curr = index + 1),
              url: req.originalUrl
            }
          }); 
        }
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
      upload(req,res,async function(err){
        if(err){
          console.log("err");
          console.log(err);
          return res.json({
            msg : err.message,
            type: 'error'
          });
        }
        var editid=req.params.id;
        console.log("aman jii:----------");
        console.log(req.file.originalname);
        const mybodydata={
          firstName : req.body.fname,
          LastName : req.body.lname,
          interest : req.body.interest,
          gender : req.body.gender,
          hobby : req.body.hobby,
          address : req.body.address,
          image: req.file.originalname
        }
        // if(req.files && req.files.image){
        //   var fileobj = req.files.image;
        //   var filename = req.files.image.name;
        //   fileobj.mv('public/images/'+filename, function(err) {
        //     if(err) throw err;
        //     console.log("file uploaded");
        //   })
        //    mybodydata.image = filename;
        // }
        let data = await UserModel.findByIdAndUpdate(editid,mybodydata);
        res.json({
          type: 'success',
          msg :"Update Successful", 
          data: data
          });
      })
  } catch (e) {
        console.log(e);
        res.json({status : "error"})
  }
});

module.exports = router;
