// setup modules
var express         = require('express');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
// setup express
var app             = express();

// use logger
app.use(logger('dev'));
// use middleware to parse application/json
app.use(bodyParser.json());
// use custom router
app.use('/', require('./app/route/note-rt'));
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

// start server
app.listen(1337, 'localhost', function () {
    console.log("Server started at " + new Date())
});
