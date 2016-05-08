var express = require('express');
var router = express.Router();
var request = require('request');
var Book = require('../models/book');



/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: "Index | BookTrader"
	});
});

router.get('/books/all', function(req, res){
	// if(req.xhr)
	Book.find({},{},function(err, book_list){
		if (err) throw err;
		res.render("book_list", {
			title:"All Books | BookTrader",
			book_list: book_list
		})
	});			
});

router.get('/books/my', function(req, res){
	res.render
});

router.get('/books/add', function(req, res){
	res.render('add_book', {
		title: "Add Book | BookTrader"
	});
});

// require login an ajax url that
router.post('/books/add', function(req, res){
	var book = req.body;
	book.owner = req.user._id;

	Book(book).save(function(err, new_book){
		if(err){
			res.json({success:false});
		} else {
			res.json({success:true});
		}
	});
});

module.exports = router;
