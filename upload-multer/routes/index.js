var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')

  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + file.originalname)
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/single', function(req, res, next) {
  res.render('single');
});

router.post('/single', upload.single('file1'), function(req, res, next) {
  var fileinfo=req.file.filename;
  res.send(fileinfo);
  
});

router.get('/multiple', function(req, res, next) {
  res.render('multiple');
});

router.post('/multiple',upload.array('file2') ,function(req, res, next) {
  var fileinfo=req.files.filename;
  res.send(fileinfo);
  
});

module.exports = router;
