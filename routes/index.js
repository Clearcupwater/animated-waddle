var express = require('express');
var router = express.Router();
var user = require('../models/user');



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome to the Basketball API... To sign up go to POST/signup and then POST/authenticate to access other routes. To access other Routes you must have a bearer token on your HTTP header Authorization : Bearer JWTToken '});
});





// sign up get bearer token 
router.post('/signup', function(req, res) {
        console.log('in user signup route');
        user.create(req.query, function(err,sucess){
                if (err){ res.send(err)}
                        else{
                        user.findOne({_id:sucess._id}, function(err,user) {
                                if (err) {res.send(err)}
                                        else {
                                                console.log(user);
                                                console.log(req.query.password);
                                        user.setPassword(req.query.password);
                                        user.save(function(err){res.send(err)});
					var token = user.generateJwt();
                                        res.json({sucess: true, message: 'Your record was created and saved', token: token}
						
						)
                                        }

                        })

                }
        }
        )
});

router.post('/authenticate', function(req, res) {
        //expects a query id and password returns a bearer token
	if(!req.query.email || !req.query.password){	
			res.json({sucess:false, message: 'You need both an email and password'})
		}
		else{
        		user.findOne({email:req.query.email}, function(err, user){
                		if(!user) {res.json({sucess: false, message:'Your password/username is not correct'})}
        				else {
                				if(user.validPassword(req.query.password)===true){
                        			var token = user.generateJwt();
                        			res.json({sucess: true, token: token});
								}
                					else{
                        					res.json({sucess:false, message:'Your password/username is not correct'})
                						}


        				}
       				 }		

			)
		}
})






module.exports = router;
