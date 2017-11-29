var mongoose= require('mongoose');
module.exports= mongoose.model('Product'{
	name:String,
	descrip:String,
	price:double,
	photo:String,
	descuent:double,
	dateStart:Date,
	dateEnd:Date
});
