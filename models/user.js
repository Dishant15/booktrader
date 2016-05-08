var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// mongoose for user table
var UserSchema = mongoose.Schema({
	username: {type:String, index:true},
	password: {type: String, required : true},
	email: String,
  name:String,
	city: String,
	state: String
},
	{collection : 'user'}
);

UserSchema.methods.get_name = function() {
  return this.name || this.username;
};

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10 , function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.comparePassword = function(password, hash, callback){
	bcrypt.compare(password, hash, function(err, res) {
	    callback(null, res);
	});
}



// passport for user auth
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      User.comparePassword(password, user.password, function(err, isMatch){
      	if(err) throw err;
      	if(isMatch){
      		return done(null, user);
      	} else {
        	return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});