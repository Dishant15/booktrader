var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

/* GET users listing. */
router.get('/login', function(req, res) {
    res.render('user/login', {
    	title: 'LogIn | BookTrader'
    });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
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
	var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

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

module.exports = router;
