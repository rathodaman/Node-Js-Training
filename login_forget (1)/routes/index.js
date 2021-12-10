var express = require('express');
var router = express.Router();
var usermodel=require('../model/user_model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//SignUp Get Method
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//SignUp Post Method
router.post('/signup', function(req, res, next) {
  //console.log("hello aman");
  //console.log(req.body);
  var fileobj=req.files.user_image
  var filename=req.files.user_image.name
  console.log(req.files.user_image);
 

  const mybodydata=({
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_image : filename,
    user_isadmin: req.body.user_isadmin,
  
    user_joindate : req.body.user_joindate,
    
  });
  var data=usermodel(mybodydata);
  
  data.save(function(err,data){
    if(err){
      console.log("error in insertion data signup" +err);
    }
    else{
      console.log("insertion data signup successfull" +data);
      fileobj.mv("public/images/"+filename,function(err){
        if(err)
        return res.status(500).send(err);
        console.log("file uploaded");  
      });
      res.redirect('/login');
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/form-process', function (req, res, next) {

  var email = req.body.user_email;
  var password = req.body.user_password;

  console.log(req.body);
  usermodel.findOne({ "user_email": email }, function (err, db_users_array) {

console.log("Find One " + db_users_array);

if (db_users_array) {
  //var db_name = db_users_array.user_name;
  var db_email = db_users_array.user_email;
  var db_password = db_users_array.user_password;

}

console.log("db_users_array.user_email " + db_email);
console.log("db_users_array.user_password " + db_password);

if (db_email == null) {
  console.log("If");
  res.end("Email not Found");
}
else if (db_email == email && db_password == password) {
  req.session.name="aman rathod";
  console.log(req.session.name);
  req.session.email = db_email;
   res.redirect('/home');
  
}
else {
  console.log("Credentials wrong");
  res.end("Login invalid");
}

 
  });
});

router.get('/home', function (req, res, next) {

  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  //var myname= req.session.name;
  console.log(myemail);

  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  res.render('home', { myemail: myemail});
});





//Change Paassword Page Route
router.get('/change-password', function (req, res, next) {

  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }

  res.render('change-password');
});

//Change Password Process Page
router.post('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  usermodel.findOne({ "user_email": myemail }, function (err, db_users_array) {

    if (err) {
      console.log("Error in Old Password Fetch " + err);
    } else {
      console.log(db_users_array);


      if (opass == db_users_array.user_password) {

        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {

          if (npass == cpass) {

            usermodel.findOneAndUpdate({ "user_email": myemail }, {$set: {"user_password": npass}}, function (err) {
           
              if(err)
              {
                res.end("Error in Update"+err);
              }else{ 

                res.send("Password Changed");
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

//Logout Page
router.get('/logout', function (req, res) {

  req.session.destroy();
  res.redirect("/");
});

//Forgot Password Get Method
router.get('/forget-password', function (req, res, next) {
  res.render('forget-password');
});

//forget password Post  Method
router.post('/forget-password', function (req, res, next) {

  var email = req.body.user_email; 

  console.log(req.body);
  usermodel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

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

//display table
router.get('/display-table', function (req, res, next) {
  usermodel.find(function (err, db_users_array) {
    if (err) {
      console.log("Error in Fetch Data " + err);
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('display-table', { user_array: db_users_array });
    }
  });
});

router.get('/delete/:id', function(req, res, next) {
  var deleteid=req.params.id;
  usermodel.findByIdAndDelete(deleteid,function(err,data){
    if(err){
      console.log("error in Delete"+err)
    }
    else{
      console.log("data Deleted"+data);
     res.redirect('/display-table');
    }
  });
});

router.get('/edit/:id', function(req, res, next) {
  var editid=req.params.id;
  usermodel.findById(editid,function(err,data){
    if(err){
      console.log("error in update" + err);
    }
    else{
      console.log("Data updated Successfully" + data);
      res.render('edit',{editdata:data});
    }
  })
 });
 
 router.post('/edit/:id', function(req, res, next) {
   var editid=req.params.id;
   const mybodydata={
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_isadmin: req.body.user_isadmin,
    user_joindate : req.body.user_joindate,
    user_image : req.body.user_image
   }
   usermodel.findByIdAndUpdate(editid,mybodydata,function(err,data){
     if(err){
       console.log("error in update"+err);
     }
     else{
       console.log("data updated"+data);
      res.redirect('/display-table');
     }
   });
 });
 



module.exports = router;
