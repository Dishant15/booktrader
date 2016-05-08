var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
	name: String,
	image: String,
	owner: String,
	status: {type:String, default:"N"}    // N : null , T : traded
},
	{collection : 'books'}
);

var Book = module.exports = mongoose.model('Book', BookSchema);
