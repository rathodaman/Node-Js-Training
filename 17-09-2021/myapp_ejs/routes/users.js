var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addition', function(req, res, next) {
  res.render('addition', { title: 'Express' });
});

router.post('/addition', function(req, res, next) {
  console.log(req.body);
  var a=parseInt(req.body.no1);
  var b=parseInt(req.body.no2);
  var c= a+b;
  console.log(a,b,c);
  res.render('result', {no1:a,no2:b,result:c});
});

module.exports = router;
