var express = require('express');
var router = express.Router();
var request = require('request');



/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: "Index | BookTrader"
	});
});

router.get('/books/add', function(req, res){
	res.render('add_book', {
		title: "Add Book | BookTrader"
	});
});

module.exports = router;
