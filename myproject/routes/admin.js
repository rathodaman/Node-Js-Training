var express = require('express');
var router = express.Router();
const swal =require('sweetalert');


var adminModel = require('../models/admin-model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('admin/account/signup');
});


router.post('/signup', function(req, res, next) {
    const mybodydata = {
        admin_name : req.body.admin_name,
        admin_email : req.body.admin_email,
        admin_password : req.body.admin_password
    }

    var data = adminModel(mybodydata);
    data.save(function(err){
        if(err){
            console.log("Error in Insert admin"+err);
        }else{
            console.log("Admin Insert Successfully");
                res.redirect('/admin/signup');    
        }
    })
});

//Admin Login
router.get('/login', function(req, res, next) {
  res.render('admin/account/login');
});

//Admin Login for post method
router.post('/login',function(req, res, next){
   
  var email = req.body.admin_email;
  var password = req.body.admin_password;
  console.log(req.body);
  adminModel.findOne({'admin_email' : email}, function(err, db_admin){
 
    console.log("Find One"+ db_admin);

    if(db_admin){
      var db_name = db_admin.admin_name;
      var db_email = db_admin.admin_email;
      var db_password = db_admin.admin_password;
    }

    console.log("db_admin.email"+db_email);
    console.log("db_admin.password"+db_password);

    if(db_email == null)
    {  
      console.log("if")
      res.end("Email not found");
    }
    else if(db_email == email && db_password == password){
      req.session.email = db_email;
      req.session.name = db_name;
      res.redirect('/admin/dashboard');
    }
    else{
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  })
})

//Admin Dashbord
router.get('/dashboard', function(req, res, next) {
  console.log("Admin Dashboard Called " + req.session.email);
  var adminemail = req.session.email;
  var adminname = req.session.name;
  //var myname= req.session.name;
  console.log(adminemail);

  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  res.render('admin/account/dashboard', { adminemail: adminemail,adminname:adminname});
});

//display
router.get('/display',function(req, res, next){
  adminModel.find(function(err, data){
      if(err){
          console.log("Error in admin display"+err);
      }else{
          console.log("Successfully display admin"+data);
          res.render('admin/account/display',{admindata : data});
      }
  }).lean();
});



//change password page route
router.get('/changepassword', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/admin/login');
  }
  res.render('admin/account/changepassword');
});

//Change Password Process Page
router.post('/changepassword', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/admin/login');
  }
  console.log("Home Called " + req.session.email);
  var adminemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  adminModel.findOne({ "admin_email": adminemail }, function (err, db_admin) {

    if (err) {
      console.log("Error in Old Password Fetch " + err);
    } else {
      console.log(db_admin);


      if (opass == db_admin.admin_password) {

        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {

          if (npass == cpass) {

            adminModel.findOneAndUpdate({ "admin_email": adminemail }, {$set: {"admin_password": npass}}, function (err) {
           
              if(err)
              {
                res.end("Error in Update"+err);
              }else{ 

                res.send("Password Changed Sucessfully");
              }
           
            });

          } else {
            res.end("New Password and Confirm Password not match");
          }

        }

      } else {
        res.end("Old Password Not Match");
      }

    }
  });
});

//Admin Logout Page
router.get('/logout', function (req, res) {

  req.session.destroy();
  res.redirect("/admin/login");
});


//Forgot Password Get Method
router.get('/forgotpassword', function (req, res, next) {
  res.render('admin/account/forgotpassword');
});

//forget password Post  Method
router.post('/forgotpassword', function (req, res, next) {

  var email = req.body.admin_email; 

  console.log(req.body);
  adminModel.findOne({ "admin_email": email }, function (err, db_admin) {

    console.log("Find One " + db_admin);

    if (db_admin) {
      var db_email = db_admin.admin_email;
      var db_password = db_admin.admin_password;

    }

    console.log("db_admin.admin_email " + db_email);
    console.log("db_admin.admin_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email) {
     
      
      

      "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "aakashrathod1593@gmail.com", // generated ethereal user
      pass: "8827204787" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Forget Password👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Forget Password", // Subject line
    text: "Hello your password is "  + db_password, // plain text body
    html: "Hello your password is "  + db_password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //res.end(swal("Hello world!"));
  res.end("Password Sent on your Email");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error); 
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});


router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  adminModel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in Delete Admin"+err)
    }
    else{
      console.log("Admin data Deleted"+data);
     res.redirect('/admin/display');
    }
  });
});

router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  adminModel.findById(editid,function(err,data){
    if(err){
      console.log("error in update" + err);
    }
    else{
      console.log("admin Data updated Successfully" + data);
      res.render('admin/account/edit',{editdata:data});
    }
  })
 });
 
 router.post('/edit/:id', function(req, res, next) {
   var editid=req.params.id;
   const mybodydata={
        admin_name : req.body.name,
        admin_email : req.body.email,
        admin_password : req.body.password
   }
   adminModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
     if(err){
       console.log("error in update admin data"+err);
     }
     else{
       console.log("admin data updated"+data);
      res.redirect('/admin/display');
     }
   });
 });
 

module.exports = router;