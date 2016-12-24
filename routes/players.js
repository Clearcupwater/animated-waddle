var express = require('express');
var router = express.Router();
var player= require('../models/player.js');

/* GET players */
router.get('/', function(req, res) {	
	console.log('in players final all route');
 	player.find(function(err,players){
	if (err) res.send(err);
	res.send(players);
	})

})

//Get Specific player id if error send back to middleware
router.get('/:playerid', function(req,res, next){
	console.log('in id search route');
	player.findById(req.params.playerid, function(err, players){
	if (err){ next();}
		else{
	res.send(players);	
	}
	})
	
})

//create a raw query to fetch data from database the first must be /players/query?key=value
router.get('/query', function(req, res) {
	console.log('in query route');
	console.log(req.query);
	player.find(req.query, function(err,players){
		if (err) res.send(err);
		res.send(players);
	})

})

//route to create new records inside the database
router.post('/', function(req,res){
	console.log('in post player route');
	console.log(req.query);
	player.create(req.query, function(err,sucess){
		if (err){ res.send(err)}
			res.send(sucess)

	}
	)

})

//router to deal with find and update
router.put('/:playerid', function(req,res){
	console.log('in update player route');
	player.findOneAndUpdate({_id:req.params.playerid},{$set:req.query},{new:true}, function(err,sucess){
	if (err){ res.send(err)}
		else{
	res.send(sucess)
		}


	})

})

//router to deal with the delete
router.delete('/:playerid', function(req,res){
	console.log('in the delete player router');
	player.findByIdAndRemove(req.params.playerid,function(err, sucess){
		console.log(err);
		console.log(sucess);
		if (err){ res.send(err)}
			else{
			res.send(sucess);
		}

	})
	
})

/*router.get('/query/:query', function(req, res){
	console.log('we are inside the query area');
	console.log(req.params);
	console.log(req.params.query);
	console.log(typeof(req.params.query));
	var json = JSON.parse(req.params.query);
	console.log(json);	
	console.log(typeof(json));
	players.find(json, function(err,players){
	if (err) res.send(err);
	res.send(players);
	})	

})*/





module.exports = router;
