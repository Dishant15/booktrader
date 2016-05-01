var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

function loginRequired(req, res, next) {
	if(req.user) next();
	else {
		req.flash('error_msg', 'Please login to proceed!!');
		res.redirect('/users/login');
	}
}

router.get('/login', function(req, res) {
    res.render('user/login', {
    	title: 'LogIn | BookTrader'
    });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/users/login',
                                   failureFlash: true })
);

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'Logout successfull!!');
	res.redirect('/');
});

router.get('/signup', function(req, res) {
    res.render('user/signup', {
    	title : 'SignUp | BookTrader'
    });
});

router.post('/signup', function(req, res) {
	// validation checks
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', "Email is required").notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
    	res.render('user/signup', {
	    	title: "SignUp | BookTrader",
	    	errors: errors
	    });
    } else {
    	var newUser = new User(req.body);

    	User.createUser(newUser, function(err, user){
    		if (err) {throw err;}
    		req.flash('success_msg',"Welcome to BookTrader!!");
    		req.login(user, function(err){
    			res.redirect('/');
    		});
    	});
    }
});

// user profile module
router.get('/profile', loginRequired, function(req, res){
	res.render('user/profile', {
		title: 'Profile | BookTrader'
	})
});

// user profile module
router.post('/update/details', loginRequired, function(req, res){
	var user = req.user;
	user.city = req.body.city || null;
	user.state = req.body.state || null;
	user.save(function(err, u){
		if(err) throw err;
		res.redirect('/users/profile');
	});
});

// user profile module
router.post('/update/password', loginRequired, function(req, res){
	var loggeduser = req.user;

	req.checkBody('curr_pass', 'Please enter your current password').notEmpty();
	req.checkBody('new_pass', 'Please enter a new password').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.render('user/profile', {
			title: 'Profile | BookTrader',
			errors: errors
		})
	} else {
		// validation passed change the password
		User.comparePassword(req.body.curr_pass, loggeduser.password, function(err, isMatch){
			if(isMatch){
				loggeduser.password = req.body.new_pass;
				User.createUser( loggeduser, function(err, u){
					res.redirect('/users/profile');
				});
			} else {
				req.flash('error_msg', 'Wrong current password!!');
				res.redirect('/users/profile');
			}
		});
	}
});

module.exports = router;
