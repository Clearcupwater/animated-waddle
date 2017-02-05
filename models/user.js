var mongoose = require('mongoose');
var schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var userSchema = new schema({
	email:{
		type: String,
		unique: true,
		required:true
	},
	firstname: {
		type:String,
		required: true
	},
	lastname: {
		type:String,
		required: true
	},
	hash : String,
	salt: String
	
})

userSchema.methods.setPassword = function (password){
	console.log('we are in set password');
	console.log(password);
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64).toString('hex'); 
	console.log(this.salt);
	console.log(this.hash);

}

userSchema.methods.validPassword = function (password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;


}

userSchema.methods.generateJwt = function(){
	console.log('in generate jwt console');
	var expiry = new Date();
	expiry.setDate(expiry.getDate()+ 7); 

	
	var jwtdata = jwt.sign({
	_id: this.id,
	email: this.email,
	exp: parseInt(expiry.getTime()/1000),
	},config.secret);
	return(jwtdata);

	}




var user = mongoose.model('user',userSchema);

module.exports= user;
