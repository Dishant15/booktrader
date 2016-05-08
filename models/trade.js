var mongoose = require('mongoose');

var TradeSchema = mongoose.Schema({
	request_from: String,
	book: String,
	book_owner: String,
	status: {type:String, default:"N"}   // N : created, A : Accepted, D : Denied
},
	{collection : 'trade'}
);

var Trade = module.exports = mongoose.model('Trade', TradeSchema);
