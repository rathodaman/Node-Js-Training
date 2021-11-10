var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/table', function(req, res, next) {
  //Normal then Using
  fetch('http://127.0.0.1:3000/display')
    .then(res => res.json())
    .then(json => res.render('table',{mydata : json}));
});

router.get('/data', function(req, res, next) {
  //Async Await  Using
 async function asyncFun(){
   try{
        const response = await fetch('http://127.0.0.1:3000/display');
        const data = await response.json();
        console.log(data);
        res.render('data',{mydata : data});
      }
      catch(err){
        console.log(err);
      }
  }
  asyncFun();
});

router.get('/task', function(req, res, next) {
   fetch('https://images.wallpapersden.com/image/download/one-plus-never-settle_am1qbWeUmZqaraWkpJRmbmdlrWZlbWU.jpg')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.blob();
  })
  .then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });
});


router.get('/task1', function(req, res, next) {
 async function asyncFun(){ 
   try{
          const response=await fetch('https://images.wallpapersden.com/image/download/one-plus-never-settle_am1qbWeUmZqaraWkpJRmbmdlrWZlbWU.jpg')
          const myBlob= await response.blob();
        let objectURL = URL.createObjectURL(myBlob);
        let image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
     }catch(error){
      console.log('There has been a problem with your fetch operation: ' + error);
     }
   } 
  asyncFun();     
});



module.exports = router;
