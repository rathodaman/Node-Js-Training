var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken'); 
const { check, validationResult } = require('express-validator');
const { Parser, json2csv } = require('json2csv');
const multer  = require('multer')
var path = require('path');
const userModel=require("../schema/userSchema");
const csvFileSchema = require('../schema/csvFileSchema');
const importCsvData = require('../schema/importCsvData');
const addField = require('../schema/addFields');
const CSVToJSON=require('csvtojson');
var fs = require('fs');
const lineReader = require('line-reader');
// const CronJob = require('cron').CronJob;


//multer using import csv file
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
      if(ext !== '.csv') {
       // return res.json("Only images are allowed");
       console.log("Only CSV Files are allowed");
          return callback(new Error('Only CSV Files are allowed'))
      }
      callback(null, true)
  },
})

/* GET home page. */
router.get('/',async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//multer Using File Upload
router.post("/upload", upload.single("file"),async (req, res) => {
  try{
        console.log("hello aman mannu");
        console.log(req.cookies);
        console.log(req.cookies.loginId);
        console.log(req.file);
        console.log("File name is :- "+req.file.originalname);
        console.log(req.file.path);
        let fileName=req.file.originalname;
        let filePath=req.file.path;
        let uploadedBy= req.cookies.loginId;
        let data=await addField.find();
        console.log("data is h:");
        console.log(data);
        console.log(data[0].fields);
        
        const users = await CSVToJSON({noheader:true,output: "csv"}).fromFile(`public/images/${fileName}`);
        console.log("last m data h ................");
        // log the JSON array
        console.log(users);
        console.log("users.Length");
        console.log(users.length);
        console.log("Object.keys(users)");
        console.log(Object.keys(users[0]));
        console.log("Object.values(users[0])");
        console.log(Object.values(users[0]));
        const mybodydata=({
          fileName: fileName,
          filePath: filePath,
          totalRecords:users.length,
          status:"pending",
          uploadedBy:uploadedBy
        });
        var mydata=await csvFileSchema.create(mybodydata);
        console.log("mydata....");
        console.log(mydata);  
        console.log("mydata._id");
        console.log(mydata._id);   
        let currentFileId=mydata._id;
    
        res.json({
                    'flag':1,
                    'status':200,
                    'message':'File uploaded',
                    fileName:fileName,
                    firstRow:Object.values(users[0]),
                    secondRow:Object.values(users[1]), 
                    fields:data,
                    currentFileId:currentFileId
                    // field:field
                });
  }catch(err){
    res.send(JSON.stringify({'flag':0,'message':'error in Upload File','err':err})); 
  }
});  


//Add fields router
router.post('/addFields', async (req, res, next) => {
  try{
      console.log("req.body");
      console.log(req.body);
      console.log(req.body.newFieldName);
      const fielddata ={
        fields:req.body.newFieldName
      }
      fields=await addField.create(fielddata)
      console.log("fields");
      console.log(fields);
      let data=fields.fields
      res.json({msg:'success',newField:data});
  }catch(err){
    console.log(err);
  }
});



//import mapping Router
router.post('/import',async function(req, res, next) {
  try{
      console.log("req.body my Route")
      console.log(req.body)
      // console.log("req.params.id")
      // console.log(req.params.id)
      let uploadedBy= req.cookies.loginId;
      console.log("uploadedBy");
      console.log(uploadedBy);
      let fileName=req.body.fileName;
      let currentFileId= req.body.currentFileId
      console.log("currentFileId");
      console.log(currentFileId);
      let filePath =`public/images/${fileName}`;
      const users = await CSVToJSON({noheader:true,output: "csv"}).fromFile(filePath);

      //skip First Row
      if(req.body.skip === "true") {
        var firstKey = Object.keys(users)[0];
        users.shift()
        console.log("first Row deleted...")
      }

      console.log(users);
      let mykey = req.body['data[]'].length
      let mykey1 = req.body['data[]']
      // console.log("mykey.length");
      // console.log(mykey);
      // console.log(mykey1);
      // console.log("mykey");
      // console.log(mykey);
      // var myobj=null;
      // var csvArray=[];
    
      // for(let i=0; i<users.length; i++){
      //     myobj = {};
      //     for(let j=0; j<mykey; j++){
      //         myobj[req.body['data[]'][j]]=users[i][j];
      //     } 
      //     console.log(myobj);
      //     csvArray.push(myobj)
      // }
      // console.log(csvArray);
      
      // let totalrecords=csvArray.length
      // console.log("totalrecords");
      // console.log(totalrecords);

      // //discard And Duplicates Both
      // const regexEmail = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
      // const regexPhone ='^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$';
      // let count=0;
      // var elements = [];
      // var check = {};
      // var a=Object.assign({}, csvArray);
      // console.log("Array of Object Assign in Object")
      // console.log(a)
      // var flag=1;
      // var press=1;
      // var p=0;
      // var temp = [];
      // var obj = {};
      // var uniqueRecord = [];
      // for(var i=0; i<csvArray.length; i++)
      // {
      //   if(mykey1.includes('email')){
      //       flag=0
      //     if(a[i].email.match(regexEmail)){
      //       flag=1
      //     }
      //   }
      //   if(mykey1.includes('phone')){
      //       press=0
      //     if(a[i].phone.match(regexPhone)){
      //       press=1
      //     }
      //   }
      //   if(flag==1 && press==1){
      //     elements.push(a[i])
      //     check[p]=Object.assign({},a[i]);
      //     if(Object.keys(check).length){
      //       if((temp.indexOf(check[p].email) == -1)){
      //         temp.push(check[p].email);
      //         obj.email = check[p]
      //         uniqueRecord.push(obj.email = check[p]);
      //       }
      //     }
      //     p++;
      //   }
      //   else{
      //     count++;
      //   } 
      // }


      // console.log("After Discarded")
      // console.log(elements)
      // console.log("discarded record No :- ",count)
      // // console.log(" Unique Record is")
      // // console.log(uniqueRecord)

      // let afterDiscardNo =elements.length;
      // console.log("afterDiscardNo");
      // console.log(afterDiscardNo);

      // console.log("uniqueRecord")
      // console.log(uniqueRecord)
      // let uniqueRecordNo=uniqueRecord.length;

      // let duplicateRecordsNo =afterDiscardNo-uniqueRecordNo;
      // console.log("uniqueRecordNo");
      // console.log(uniqueRecordNo);

      // console.log("duplicateRecordsNo");
      // console.log(duplicateRecordsNo);
     
      // //store in DB
      // var data=await importCsvData.create(uniqueRecord);
      // console.log("data");
      // console.log(data);
      

      // /////////cron Start////////////////////////////////
      // // Creating a cron job which runs on every 10 second
      // var job = new CronJob('* * * * * *',async function() {
      //   // var job = new CronJob('*/5 * * * *', function() { 
      //   console.log('You will see this message every second');
      // }, null, true, 'America/Los_Angeles');
      // job.start();
      // /////////cron End/////////////////////////////////

      const fileInformation=({
        fieldMappingObject: mykey1,
        skipFirstRow:req.body.skip
      });
      var csvFileDetailsData=await csvFileSchema.findByIdAndUpdate(currentFileId,fileInformation);
      // var csvFileDetailsData=await csvFileSchema.create(fileInformation);
      console.log(csvFileDetailsData);

      res.json({status :200,"message":"hello Aman mapping kro"});
    }catch(err){
      console.log(err);
    }
});

//MiddleWare to Check Auth
var AuthJWT  = (req,res,next) => {
  // var token = req.headers.authorization;
  var token = req.cookies.token;
  console.log("hello token"+ token);
//  token = token.split(' ')[1];
  var privateKey = 'sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf';
  jwt.verify(token,privateKey,function(err,decoded){
    if(err){
        console.log(err);
      //res.send({message:'Invalid Token'});
      console.log("Login required to Access this page");
      res.redirect('/login')
    }else{
      next();
    }
  })
}


//SignUp Get Method
router.get('/signup',AuthJWT,async function(req, res, next) {
  try{
    let db_users_array=await  userModel.find().lean();
    console.log(db_users_array);
    res.render('signup', { user_array: db_users_array});
  }catch(err){
    console.log("Error in Fetch Data " + err);
      res.send(JSON.stringify({"flag":0,"message":"Error in Api","err":err}));
  }
});

//SignUp Post Method
router.post('/signup',
[
  check('email')
  .notEmpty().withMessage('Email is Required').trim().escape().normalizeEmail()
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        userModel.findOne({email:req.body.email}, function(err, data){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(Boolean(data)) {
            reject(new Error('E-mail already in use'))
          }
          resolve(true)
        });
      });
    }),
  check('name').notEmpty().withMessage('Name is Required').trim().escape(),
  check('password').not().isEmpty().withMessage('password is required').trim()
  .isLength({ min: 6, max: 15 }).withMessage('password length must be between 6 and 15 characters'),
  check('phone')
  .notEmpty().withMessage('Mobile No is Required')
  .isLength({ min: 10, max: 10 }).withMessage('Mobile number should contains 10 digits')
  .custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      userModel.findOne({phone:req.body.phone}, function(err, data){
        if(err) {
          reject(new Error('Server Error'))
        }
        if(Boolean(data)) {
          reject(new Error('This Phone No.is already Exits'))
        }
        resolve(true)
      });
    });
  }),
],async function(req, res, next) {
  try{
    const errors = validationResult(req).mapped();
    console.log("hello ji kese ho");
          console.log(req.body);
    // console.log(" aman errors");
    // // console.log(errors);
    // console.log(" aman errors11");
    // console.log(req.body);
    // console.log(" aman errors22");
    // console.log(req.body.name);
        if (errors.email) {
          console.log("Error in  name" + errors.email.msg);
          return res.send(errors.email.msg)
        }
        if (errors.name) {
          console.log("Error in  name" + errors.name.msg);
          return res.send(errors.name.msg)
        }
        if (errors.password) {
          console.log("Error in  password" + errors.password.msg);
          return res.send(errors.password.msg)
        }
        if (errors.phone) {
          console.log("Error in  phone" + errors.phone.msg);
          return res.send(errors.phone.msg)
        }
        if(Object.keys(errors).length){
          let data=req.body;
          return  res.render('signup', {errors: errors,data:data});
           //res.send(errors,data);
        }
        else{
          const mybodydata=({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
          });
          var data=await userModel.create(mybodydata);
            console.log("insertion data signup successfull" +data);
            // res.redirect('/login');
            // res.json({success:"success",data:data});
            res.send({'flag':1,'status':200,'message':'record Added',data:data});
        }
  }catch(err){
    console.log("error in insertion data signup" +err);
      res.send(JSON.stringify({'flag':0,'message':'error in API','err':err}));
  }
});

//replace router
router.get('/add',AuthJWT,async function(req, res, next) {
  try{
    if(req.query.exportType == 'csv'){
      console.log("export CSV aman file>>>>");
      console.log(req.query);
      let data=await  userModel.find().lean();
      const fields = ['name','email','phone'];
      const opts = { fields };
      try {
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        console.log(csv);
        //console.log(json2csv);
        // csv = json2csv(numbers, opts);
        let fileName=`users.csv`
        console.log(fileName);
        res.setHeader('Content-disposition', 'attachment; filename='+fileName);
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
      } catch (err) {
        console.log(("aman"));
        console.error(err);
      }
    }
    else{
      let db_users_array=await  userModel.find().lean();
      console.log(db_users_array);
      res.render('partials/table', { user_array: db_users_array });
    }
  }catch(err){
    console.log("Error in Fetch Data " + err);
      res.send(JSON.stringify({"flag":0,"message":"Error in Api","err":err}));
  }
});

//login get method
router.get('/login', function(req, res, next) {
  res.render('login');
});

//api login start
router.post('/login',async function (req, res, next) {
  try{
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.email;   
    console.log("req.body")  
    console.log(req.body)  
   const db_users_array=await userModel.findOne({$or:[
                                                      {email: req.body.email },{phone: req.body.email }
                                                     ]
    })
   console.log("Find One " + db_users_array);
    var db_loginId=db_users_array._id
    var db_name = db_users_array.name;
    var db_email = db_users_array.email;
    var db_password = db_users_array.password;
    var db_phone = db_users_array.phone;
    
    console.log("db_users_array._id " + db_loginId);
    console.log("db_users_array.email " + db_email);
    console.log("db_users_array.password " + db_password);
    console.log("db_users_array.phone " + db_phone);
    console.log("db_users_array.password " + db_password);
    if((db_email == email && db_password == password) || (db_phone == phone && db_password == password)){
            //Token Key 32 Character
          var privateKey = "sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf"
          let params = {
              email : db_users_array.user_email,
              name: db_users_array.user_name,
              gender: db_users_array.user_gender,
              mobile: db_users_array.user_mobile,
              dob: db_users_array.user_dob
          }
          var token =  jwt.sign(params, privateKey); // , { expires_in: '500s' }
          console.log("Token is "  + token);
          res.cookie("token", token);
          res.cookie("loginId", db_loginId);

          console.log("Cookies: ");
          console.log(req.cookies);
          res.send({"status": 200,"flag": 1, "message": "Login Success", "Token": token});
          // res.send({"flag":1,"status":200,"message":`Welcome ${db_name} ji`,"Token": token});
           //res.json({"flag":1,"status":200,"message":`Welcome ${db_name} ji`,"Token": token})
          //res.redirect('/home');
    }
    else{
            if (db_email == null) {
              console.log("If");
              //res.send(JSON.stringify({"status":200,"flag":0,"message":`Login Failes No user`}));
              res.end("Email not Found");
            }
            else {
              console.log("Credentials wrong");
              // res.send(JSON.stringify({"flag":0,"message":"Invalid Email & Password"}));
              res.end("Invalid Email & Password");
            }
    }
  }catch(err){
    res.send(JSON.stringify({"flag":0,"message":"Error","err":err}));
  }
});


//display table
router.get('/usersList',AuthJWT,async function (req, res, next) {
  try{
    let db_users_array=await  userModel.find().lean();
    console.log(db_users_array);
    res.render('usersList', { user_array: db_users_array });
  }catch(err){
    console.log("Error in Fetch Data " + err);
      res.send(JSON.stringify({"flag":0,"message":"Error in Api","err":err}));
  }
});

module.exports = router;
