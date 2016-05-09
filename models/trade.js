var mongoose = require('mongoose');

var TradeSchema = mongoose.Schema({
	request_from: String,
	book: String,
	book_name: String,
	book_owner: String,
	status: {type:String, default:"N"}   // N : created, A : Accepted, D : Declined
},
	{collection : 'trade'}
);

TradeSchema.methods.get_status = function() {
	if(this.status == "N"){
		return "Ongoing";
	} else if(this.status == "A") {
		return "Accepted";
	} else {
		return "Declined";
	}
}

var Trade = module.exports = mongoose.model('Trade', TradeSchema);
