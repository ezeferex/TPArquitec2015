var mongoose = require('mongoose');

var commerceSchema = new mongoose.Schema({
    nameCommerce: {type: String},
    address: {type:String},
    phone: {type:String},
    logo: {type:String},
    descrip: {type:String}
});

var Commerce= mongoose.model('commerce',commerceSchema);
module.exports=Commerce;