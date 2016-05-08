var express = require('express');
var router = express.Router();
var request = require('request');
var Book = require('../models/book');
var Trade = require('../models/trade');

function loginRequired(req, res, next) {
	if(req.user) next();
	else {
		req.flash('error_msg', 'Please login to proceed!!');
		res.redirect('/users/login');
	}
}

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: "Index | BookTrader"
	});
});

router.get('/books/all', function(req, res){
	// if(req.xhr)
	Book.find({status:"N"},{},function(err, book_list){
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

router.get('/books/add', loginRequired, function(req, res){
	res.render('add_book', {
		title: "Add Book | BookTrader"
	});
});

// require login an ajax url that
router.post('/books/add', function(req, res){
	if(!req.user){
		// no loggeduser
		res.json({success:false});
		return null;
	}
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

router.get('/books/trade/:id', function(req, res){
	if(!req.user){
		// no loggeduser
		res.json({success:false});
		return null;
	}
	Book.findOne({_id:req.params.id}, function(err, book){
		if(err) throw err;
		Trade({
			request_from: req.user._id,
			book: book._id,
			book_owner: book.owner
		}).save(function(err, t){
			if(err) throw err;
			res.json({success:true});
		});
	});
});

module.exports = router;
