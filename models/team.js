var mongoose = require('mongoose');
var schema = mongoose.Schema;

var teamSchema = new schema({
	name:{
		type: String,
		required:true
	}
})

var team = mongoose.model('team',teamSchema);

module.exports= team;
