var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(this)
 let data=await PromiseBas(5)
  console.log(data)
  res.send("back")
});
function PromiseBas(main){
  return new Promise(function(resolve, reject){
    setTimeout(function(){  resolve(main *2) }, 5000);
   
  });
}
module.exports = router;
