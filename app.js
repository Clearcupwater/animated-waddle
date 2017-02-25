var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejwt = require('express-jwt');
var passport = require('passport');
var config = require('./config/config');
var allowCrossDomain = require('./config/allowCrossDomain');


//this is the location of the routes and what to do with the http request
var index = require('./routes/index');
var users = require('./routes/users');
var players = require('./routes/players');
var teams = require('./routes/teams');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));


//this tells the file what routes are available on http request and authenticates the routes
app.use(passport.initialize());
app.use(ejwt({secret: config.secret}).unless({path: ['/','/signup', '/authenticate']}));
app.use('/', index);
app.use('/users', users);
app.use('/players',players);
app.use('/teams',teams);

//connect to mongoose and check ready state
mongoose.connect(config.database);
mongoose.connection.on('open', function (ref){
	console.log('Connected to Mongo Server db basketball on port 27017');
}
)
mongoose.connection.on('error', function (ref){
	console.log('Error on connection to local Mongo Server');

}
)


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//makes the app visible through a port on the local machine and ready to accept http requests
const port =3000
app.listen(port, function(err){
	if (err){
		return console.log('Error on listen',err);
	}

	console.log("App Listening on", port)
}
);


module.exports = app;
