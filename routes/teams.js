var express = require('express');
var router = express.Router();
var team= require('../models/team.js');

/* GET All route */
router.get('/', function(req, res) {	
	console.log('in get all route');
 	team.find(function(err,teams){
	if (err) res.send(err);
	res.send(teams);
	})

})

//Get Specific  id if error send back to middleware
router.get('/:teamid', function(req,res, next){
	console.log('in id search route');
	team.findById(req.params.teamid, function(err, teams){
	if (err){ next();}
		else{
	res.send(teams);	
	}
	})
	
})

//create a raw query to fetch data from database the first must be /collection/query?key=value
router.get('/query', function(req, res) {
	console.log('in query route');
	team.find(req.query, function(err,teams){
		if (err) res.send(err);
		res.send(teams);
	})

})

//route to create new records inside the database
router.post('/', function(req,res){
	console.log('in post route');
	console.log(req.query);
	team.create(req.query, function(err,sucess){
		if (err){ res.send(err)}
			res.send(sucess)

	}
	)

})

//router to deal with find and update
router.put('/:teamid', function(req,res){
	console.log('in update route');
	team.findOneAndUpdate({_id:req.params.teamid},{$set:req.query},{new:true}, function(err,sucess){
	if (err){ res.send(err)}
		else{
	res.send(sucess)
		}


	})

})

//router to deal with the delete
router.delete('/:teamid', function(req,res){
	console.log('in the delete router');
	team.findByIdAndRemove(req.params.teamid,function(err, sucess){
		console.log(err);
		console.log(sucess);
		if (err){ res.send(err)}
			else{
			res.send(sucess);
		}

	})
	
})





module.exports = router;
