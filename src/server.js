var express           = require('express');
var app               = express();
var session           = require('express-session');
var mongoose		  = require('mongoose');
var bodyParser        = require('body-parser');
var User              = require('./models/User');
var Commerce          = require('./models/Commerce');
var crypto            = require('crypto');
var multer            = require('multer');
//var router            = require('./routes');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+'.jpg');
  }
})

var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(session({secret:'n23234234l23n4lk234l23',resave:false, saveUninitialized:true}));

mongoose.connect('mongodb://localhost:27017/Test');

//app.use('/', router);	

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/home',function(req,res){
	Commerce.find({},{},{sort:{x:-1},limit:4},function(err,commerces){
		return res.send(commerces);
	});
});

app.get('/adherCommerces',function(req,res){
	Commerce.find({},function(err,commerces){
		return res.send(commerces);
	});
});


app.use('/bower_components', express.static(__dirname + '/client/bower_components'));
app.use('/css',express.static(__dirname+'/client/css'));
app.use('/img',express.static(__dirname+'/client/img'));
app.use('/frontend',express.static(__dirname+'/client/frontend'));
app.use('/templates',express.static(__dirname+'/client/templates'));

//REST API

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
	Commerce.count({},function(err,c){
		//	res.body.countCommerce=c;
			
	});
	return res.status(200).send();
	})
});


app.get('/dashboard', function(req, res){
	if(!req.session.user){
		return res.status(401).send();
	}
	Commerce.count({},function(err,c){
		res.body.countCommerce=c;
		return res.status(200).send();
	});
});

app.get('/logout', function(req,res){
	req.session.destroy();
	return  res.status(200).send();
});


//app.use(multer({ dest: './client/img/'}).single('commerceLogo'));
app.post('/newCommerce',multer({ dest: './client/img/'}).single('file'),function(req,res){
	var username=req.body.commerce.name;
	var password=req.body.commerce.name;
	console.log('Se pudo subir');

	var newUserCommerce= new User();
	newUserCommerce.username= username;
	newUserCommerce.password=hashPassword(password);

	var newCommerce= new Commerce();
	newCommerce.nameCommerce= req.body.commerce.name;
	newCommerce.address=req.body.commerce.address;
    newCommerce.phone= req.body.commerce.phone;
    newCommerce.logo= req.file.filename;
    newCommerce.descrip= req.body.commerce.descrip;
    //console.log(req.body.commerce);

	newUserCommerce.save(function(err,savedUser){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
	})
	newCommerce.save(function(err){
		if(err){
			console.log(err);
			return res.status(500).send();
		}
			return res.status(200).send();
	})
});


/*app.post('/uploadImg',  ,function(req,res){
	console.log(req.file);
	return res.status(200).send();
	});*/

function hashPassword(password) {
	return crypto.createHash('md5').update(password).digest('hex');
};


app.listen(3000, function() {
  console.log('I\'m Listening...');
})