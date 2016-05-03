var express = require('express');
var router = express.Router();
var request = require('request');



/* GET home page. */
router.get('/', function(req, res) {
	// var options = {
	//     uri: 'https://www.googleapis.com/books/v1/volumes?q=the%20lost%20symbol',
	//     method: 'GET',
	//     json:true
	// }
	// request(options, function (error, response, body) {
	// 	if(error) throw error;
	// 	res.json(body);
	// });
	res.render('index');
});

router.get('/books/add', function(req, res){
	res.render('add_book', {
		title: "Add Book | BookTrader"
	});
});

module.exports = router;
