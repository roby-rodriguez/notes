// setup modules
var express         = require('express');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var favicon         = require('serve-favicon');
var compression     = require('compression');
// setup express
var app             = express();
// setup cache timeout
var aWeek = 7 * 24 * 60 * 60 * 1000;

// use logger
app.use(logger('dev'));
// compress all requests
app.use(compression());
// use middleware to parse application/json
app.use(bodyParser.json());
// use custom router
app.use('/', require('./app/route/note-rt'));
// set the static files location /dist/img will be /img for users
app.use(express.static(__dirname + '/dist', { maxAge: aWeek }));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
// set express to serve libraries from bower standard directory
app.use('/bower_components',  express.static(__dirname + '/bower_components', { maxAge: aWeek }));
// if no route matched so far reply with 404
app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

// start mongo
mongoose.connect('mongodb://localhost/notes', function (err) {
    if (err) console.error('Could not start database: ' + err.toString());
    else console.log("Database started at " + new Date())
});

// prevent server crashes
process.on('uncaughtException', function (err) {
	console.log("Uncaught exception at " + new Date());
	console.error(err);
});

// setup defaults if existing
process.env.PORT = process.env.PORT || 1337;
process.env.IP = process.env.IP || 'localhost';

// start server
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server started at " + new Date())
});
