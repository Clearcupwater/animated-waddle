var mongoose = require('mongoose');
var schema = mongoose.Schema;
var team = require('./team.js');

var playerSchema = new schema({
	firstname:{
		type: String,
		required:true
	},
	lastname:{
		type:String,
		required:true
	},

	team:[
		{type:schema.Types.ObjectId, ref:'team'}
	]
	});


var player = mongoose.model('player',playerSchema);

module.exports= player;
