// setup modules
var express         = require('express');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
// setup express
var app             = express();

// use middleware to parse application/json
app.use(bodyParser.json());
// use custom router
app.use('/', require('./app/route/note-rt'));

// start mongo
mongoose.connect('mongodb://localhost/notes', function (err) {
    if (err) console.error('Could not start database: ' + err.toString());
    else console.log("Database started at " + new Date())
});

// start server
app.listen(1337, 'localhost', function () {
    console.log("Server started at " + new Date())
});
