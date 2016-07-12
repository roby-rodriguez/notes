var mongoose = require('mongoose');
var fs = require('fs');
var Note = require('../app/model/note');
// start mongo
mongoose.connect('mongodb://localhost/notes', function (err) {
    if (err) console.error('Could not start database: ' + err.toString());
    else {
        // read test data json synchronously and parse to object
        var testdata = JSON.parse(fs.readFileSync('./testdata.json', 'utf8'));
        // iterate and upsert (i.e. insert if it does't exist already)
        testdata.forEach(function (note) {
            Note.findOneAndUpdate(
                { title: note.title }, // query
                note, // data to set
                { upsert: true }, // config
                function (err, doc) {
                    if (err) console.error(err.toString());
                    else console.log((doc && !doc.isNew ? 'Updated: ' : 'Added: ') + JSON.stringify(note));
                }
            );
        });
    }
});
