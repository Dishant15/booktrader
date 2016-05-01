var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res) {
    res.render('user/login', {
    	title: 'LogIn | BookTrader'
    });
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
    	res.end("all passed");
    }
});

module.exports = router;
