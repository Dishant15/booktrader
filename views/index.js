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

router.get('/books/my',loginRequired, function(req, res){
	var loggeduser = req.user;
	Book.find({owner:loggeduser._id}, function(err, book_list){
		if (err) throw err;
		Trade.find({request_from:loggeduser._id}, function(err, trade_list){
			if (err) throw err;
			Trade.find({book_owner:loggeduser._id}, function(err, req_in_list){
				if (err) throw err;
				res.render("my_book", {
					title:"My Books | BookTrader",
					book_list: book_list,
					trade_list: trade_list,
					req_in_list: req_in_list
				});
			});
		});
	});
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
	// this is just to show trade disable button on frontend
	book.traders = [req.user._id];

	Book(book).save(function(err, new_book){
		if(err){
			res.json({success:false});
		} else {
			res.json({success:true});
		}
	});
});

router.get('/books/trade/:id',loginRequired, function(req, res){
	if(!req.user){
		// no loggeduser
		res.json({success:false});
		return null;
	}
	var book_id = req.params.id;
	var loggeduser = req.user;


	Book.findOne({_id:book_id}, function(err, book){
		if(err) throw err;
		if(book.traders.indexOf(loggeduser._id) == -1) {
			// user can trade this book
			Trade({
				request_from: loggeduser._id,
				book: book._id,
				book_name: book.name,
				book_owner: book.owner
			}).save(function(err, t){
				if(err) throw err;
				res.json({success:true});
			});
			// update book traders
			book.traders.push(loggeduser._id);
			book.save(function(err, b){
				if(err) throw err;
			});
		} else {
			res.json({success:false});
		}
	});
});

router.get('/trade/cancel/:id', loginRequired, function(req, res){
	var loggeduser = req.user;
	Trade.findByIdAndRemove(req.params.id, function(err, t){
		if(err) throw err;
		var book_id = t.book;
		Book.findById(book_id, function(err, t_book){
			var index = t_book.traders.indexOf(loggeduser._id);
			t_book.traders.splice(index, 1);
			t_book.save();
		});
		res.json({removed:true});
	});
});

router.get('/trade/accept/:id', loginRequired, function(req, res){
	var loggeduser = req.user;
	Trade.findById(req.params.id, function(err, trade){
		if(err) throw err;
		if(trade.status != "N"){
			// this trade has already been accepted or declined
			res.json({update:false});
			return null;
		}
		trade.status = "A";
		trade.save();
		var book_id = trade.book;
		Book.findById(book_id, function(err, t_book){
			t_book.status = "T";
			t_book.save();
		});
		res.json({update:true});
	});
});

router.get('/trade/decline/:id', loginRequired, function(req, res){
	var loggeduser = req.user;
	Trade.findById(req.params.id, function(err, trade){
		if(err) throw err;
		if(trade.status != "N"){
			// this trade has already been accepted or declined
			res.json({update:false});
			return null;
		}
		trade.status = "D";
		trade.save();
		res.json({update:true});
	});
});

module.exports = router;
