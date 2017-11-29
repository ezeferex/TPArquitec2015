var mongoose = require(mongoose),
    User = require('./User');

 console.log('Hola');
var connStr = 'mongodb://localhost:27017/Test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'Admin',
    password: 'Admin123'
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;
});

// fetch user and test password verification
User.findOne({ username: 'Admin' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('Admin123', function(err, isMatch) {
        if (err) throw err;
        console.log('Admin123:', isMatch); // -&gt; Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
    });
});