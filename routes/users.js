var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/', function(req, res) {
        console.log('in user route');
        console.log(req.user);
	console.log(req.user._id);
        user.findOne({_id:req.user._id}, function(err,user){
        if (err) res.send(err);
		var tempuser = user.toObject()
        	delete tempuser.hash;
		delete tempuser.salt;
	console.log(tempuser);
		
	res.send(tempuser);
        })

})

router.put('/:userid', function(req,res){
        console.log('in user route');
	console.log(req.params.userid);
	if (req.query.password){
		res.send({message: 'You cannot change password in here use route /changepassword. No changes made'})
		return}
        user.findOneAndUpdate({_id:req.params.userid},{$set:req.query},{new:true}, function(err,user){
        if (err){ res.send(err)}
                else{
        res.send({sucess:'Your data has been data updated'})
                }


        })

})











module.exports = router;
