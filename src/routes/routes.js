var express           = require('express');
var app               = express();
var mongoose		  = require('mongoose');
var session           = require('express-session');
var bodyParser        = require('body-parser');
var User              = require('../models/User');

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.post('/register', function(req, res){
	var username= req.body.username;
	var password=req.body.password;

	var newUser= new User();
	newUser.username= username;
	newUser.password=hashPassword(password);

	newUser.save(function(err,savedUser){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		return res.status(200).send();
	})
});

app.post('/login', function(req, res){
	var username= req.body.username;
	var password=hashPassword(req.body.password);

	User.findOne({username:username, password:password}, function(err, user){
		if(err){
			console.log(err);
			return res.status(500).send();
		}

		if(!user){
			return res.status(404).send();
		}
		req.session.user=user;
		return res.status(200).send();
	})

});


app.get('/dashboard', function(req, res){
	if(!req.session.user){
		return res.status(401).send();
	}

	return res.status(200).send();
});

app.get('/logout', function(req,res){
	req.session.destroy();
	return  res.status(200).send();
});

function hashPassword(password) {
	return crypto.createHash('md5').update(password).digest('hex');
};
