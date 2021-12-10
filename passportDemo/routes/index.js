var express = require('express');
var router = express.Router();
const passport = require("passport");
var LocalStrategy  = require('passport-local').Strategy;
var usermodel=require('../schema/userSchema');
var categoryModel=require('../schema/category');
var jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aman', function(req, res, next) {
  res.render('aman');
});

//add category get method
router.get('/category', function(req, res, next) { 
  res.render('category');
});

//add category Post Method 
router.post('/category', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    categoryName: req.body.category_name
}
var data = categoryModel(mybodydata);
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
      console.log("category added");
        res.render('category');
    }
})
});

//SignUp Get Method
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//SignUp Post Method
router.post('/signup', function(req, res, next) {
  console.log("hello");
  console.log(req.body);
  const mybodydata=({
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
  });
  var data=usermodel(mybodydata);
  data.save(function(err,data){
    if(err){
      console.log("error in insertion data signup" +err);
      res.send(JSON.stringify({'flag':0,'message':'error in API','err':err}));
    }
    else{
      console.log("insertion data signup successfull" +data);
      //res.redirect('/login');
      res.send(JSON.stringify({'flag':1,'message':'record Added'}));
    }
  });
});

//login get method
router.get('/login', function(req, res, next) {
  res.render('login');
});

// passport.use(new LocalStrategy({
//   usernameField: 'user_email',
//   passwordField: 'user_password'
//   },
//   function(username, password, done) {
//     console.log("Passport "+ username + password);
//     usermodel.findOne({ user_email: username }, function(err, user) {
//       console.log("aman rathod");
//       console.log(user);
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (user.user_password != password) {
//         return done(null, false, { message: 'Incorrect password.' }); 
//       }
//         return done(null, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user.user_email);
// });

// passport.deserializeUser(function(email, done) {
//   usermodel.findOne({ user_email:email }, function(err, user) {
//     categoryModel.find(function(err,categoryData){
//       console.log("category data"+categoryData);
//       done(err,{user,categoryData});
//     })
    
//   });
// });

// //login post Method
// router.post('/form-process', function(req, res, next) {
//   passport.authenticate('local',{
//     failureRedirect : '/login',
//     successRedirect :'/home',
//   })(req,res,next);
// });

// router.use(function (req, res, next) {
//   const data = req.user;
//   if(data)
//   {
//     res.locals.data = data;
//     console.log("aman rathod",data)
//     return next();
//   }
//    res.redirect('/login')
//   })


//MiddleWare to Check Auth
var AuthJWT  = (req,res,next) => {
  var token = req.headers.authorization;
  token = token.split(' ')[1];
  console.log("hello rathod");
  console.log(token);
  var privateKey = 'sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf';
  jwt.verify(token,privateKey,function(err,decoded){
    if(err){
        console.log(err);
      res.send({message:'Invalid Token'});
    }else{
      console.log("hello rathod");
      next();
    }
  })
}

//api login start
router.post('/form-process', function (req, res, next) {
  let email = req.body.user_email;
  let password = req.body.user_password;
  usermodel.findOne({ "user_email": email }, function (err, db_users_array) {

console.log("Find One " + db_users_array);

if (db_users_array) {
  var db_name = db_users_array.user_name;
  var db_email = db_users_array.user_email;
  var db_password = db_users_array.user_password;

}

console.log("db_users_array.user_email " + db_email);
console.log("db_users_array.user_password " + db_password);

if (db_email == null) {
  console.log("If");
  res.send(JSON.stringify({"status":200,"flag":1,"message":`Login Failes No user`}));
  //res.end("Email not Found");
}
else if (db_email == email && db_password == password) {
   //Token Key 32 Character
   var privateKey = "sdasdsadsakjslkjsdlfjsdklfjsdklfjsdklfjsdklfjsdkjfsddfsdfkjsdlfjsdf"
   let params = {
       email : db_users_array.email,
       name: db_users_array.user_name
   }
   var token =  jwt.sign(params, privateKey); // , { expires_in: '500s' }
   console.log("Token is "  + token);

  res.send(JSON.stringify({"flag":1,"message":`Welcome ${db_name} ji`,"Token": token}));
  
}
else {
  console.log("Credentials wrong");
  res.send(JSON.stringify({"flag":0,"message":"Invalid Email & Password"}));
}
  });
});
//api login end

// function checkAuthenticated(req, res, next) {
//   if (req.user) {
//     return next()
//   }
//   res.redirect('/login')
// }

//home page get 
router.get('/home', function (req, res, next) {
  // console.log("my data");
  // console.log(req.user);
   //console.log("hello"+req.session.passport.user);
  //Auth
  if (!req.user) {
    console.log("Email Session is Set");
   return res.end("Login required to Access this Home page");
  }
  res.render('home',{data:req.user});
});

//contact page
router.get('/contact', function (req, res, next) {
  //Auth
  if (!req.user) {
    console.log("Email Session is Set");
    res.end("Login required to Access this Contact page");
  }
  res.render('contact',{data:req.user});
});

//About page
router.get('/about', function (req, res, next) {
  //Auth
  if (!req.user) {
    console.log("Email Session is Set");
    res.end("Login required to Access this About page");
  }
  res.render('about',{data:req.user});
});

//Logout Method Router
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});


//display table
router.get('/display-table',AuthJWT, function (req, res, next) {
  usermodel.find(function (err, db_users_array) {
    if (err) {
      console.log("Error in Fetch Data " + err);
      res.send(JSON.stringify({"flag":0,"message":"Error in Api","err":err}));
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      //res.render('display-table', { user_array: db_users_array });
      res.send(JSON.stringify({"flag":1,"message":"Data Listening","data":db_users_array}));
    }
  });
});

//delete get method
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

//Edit get method
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
 
 //Edit post method
 router.post('/edit/:id', function(req, res, next) {
   var editid=req.params.id;
   const mybodydata={
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
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
