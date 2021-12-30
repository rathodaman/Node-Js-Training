var express = require('express');
var router = express.Router();

/**
 * Get route
 */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Demo'
	});
});

module.exports = router;
