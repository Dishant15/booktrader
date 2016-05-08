var mongoose = require('mongoose');

// mongoose for user table
var BookSchema = mongoose.Schema({
	name: String,
	image: String,
	owner: String
},
	{collection : 'books'}
);

var Book = module.exports = mongoose.model('Book', BookSchema);
